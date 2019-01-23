import { Context, SpotifyUser } from '../types';
import { Party, QueuedTrack } from '../generated/prisma-client';
import { ForbiddenError } from 'apollo-server';
import { withFilter } from 'graphql-subscriptions';
import pubsub, { PubsubEvents } from '../pubsub';
import { GraphQLError } from 'graphql';
import { Playlist } from '../spotify';
import { Permissions, getPermissionForParty } from '../permissions';

interface PartyResult {
  id: string;
  partyUserIds: string[];
  requestedUserIds?: string[];
  ownerUserId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  permission: string;
  queuedTracks?: QueuedTrack[];
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface TracksChangedPayload {
  partyId: string;
  changedTrackIds: string[];
}

async function party(
  root,
  args: { partyId: string },
  context: Context,
): Promise<PartyResult> {
  const user = await context.spotify.fetchCurrentUser();
  const party = await context.prisma.party({ id: args.partyId });
  const permission = getPermissionForParty(party, user);

  return {
    id: party.id,
    name: party.name,
    permission: permission,
    requestedUserIds:
      permission === Permissions.Admin ? party.requestedUserIds : undefined,
    partyUserIds: permission !== Permissions.None ? party.partyUserIds : [],
    ownerUserId: party.ownerUserId,
    createdAt: party.createdAt,
    updatedAt: party.updatedAt,
  };
}

async function parties(
  root: { parties: { ids: string[] } },
  args: { ids: [string] },
  context: Context,
): Promise<PartyResult[]> {
  const user = await context.spotify.fetchCurrentUser();
  const parties = await context.prisma.parties({
    where: { id_in: root.parties.ids },
  });

  return parties.map(party => ({
    id: party.id!,
    name: party.name!,
    activeTrackIndex: 0,
    permission: getPermissionForParty(party, user),
    ownerUserId: party.ownerUserId,
    partyUserIds: [],
    ownerUserID: party.ownerUserId,
    createdAt: party.createdAt,
    updatedAt: party.updatedAt,
  }));
}

async function createParty(
  _,
  args: { name: string; playlistId: string },
  context: Context,
) {
  const { name, playlistId } = args;
  const playlist = await context.spotify.fetchResource<Playlist>(
    `/playlists/${playlistId}`,
  );

  const trackIds = playlist.data.tracks.items.map(track => track.track.id);
  const user = await context.spotify.fetchCurrentUser();

  return context.prisma.createParty({
    name,
    ownerUserId: user.id,
    queuedTracks: {
      create: trackIds.map(trackId => ({
        userVotes: {
          set: [], // TODO: should we vorte for the tracks?
        },
        trackId,
      })),
    },
  });
}

interface UpdatedUserVotes {
  [trackId: string]: string[];
}

async function addTracks(
  _,
  args: { partyId: string; trackIds: string[] },
  context: Context,
): Promise<Party> {
  const [party, queuedTracks, me] = await Promise.all([
    context.prisma.party({ id: args.partyId }),
    context.prisma
      .party({ id: args.partyId })
      .queuedTracks()
      // IDK why this is needed
      .then(x => x),
    context.spotify.fetchCurrentUser(),
  ]);

  const permission = getPermissionForParty(party, me);

  if (![Permissions.Admin, Permissions.Member].includes(permission)) {
    throw new GraphQLError('Unauthorized to change the party');
  }

  const updatedUserVotes: UpdatedUserVotes = {};
  const addedTracks: Omit<QueuedTrack, 'id' | 'createdAt' | 'updatedAt'>[] = [];

  args.trackIds.forEach(trackId => {
    const trackIndex = queuedTracks.findIndex(
      track => track.trackId === trackId,
    );

    // Add or remove a vote if the track already exists in the party
    if (trackIndex > -1) {
      const track = queuedTracks[trackIndex];
      updatedUserVotes[track.id] = track.userVotes.includes(me.id)
        ? track.userVotes.filter(userId => userId !== me.id)
        : [...track.userVotes, me.id];
    } else {
      // Create a new QueuedTrack entry
      addedTracks.push({
        trackId: trackId,
        userVotes: [me.id],
      });
    }
  });

  await context.prisma.updateParty({
    where: { id: args.partyId },
    data: {
      queuedTracks: {
        update: Object.entries(updatedUserVotes).map(([id, userVotes]) => ({
          where: { id },
          data: {
            userVotes: {
              set: userVotes,
            },
          },
        })),
        create: addedTracks.map(track => ({
          trackId: track.trackId,
          userVotes: {
            set: track.userVotes,
          },
        })),
      },
    },
  });

  await context.prisma.party({ id: args.partyId });

  pubsub.publish(PubsubEvents.PartyTracksChanged, {
    partyId: args.partyId,
    changedTrackIds: addedTracks.map(track => track.trackId),
  });

  return party;
}

async function partySubscription(
  _,
  args: { partyId: string },
  context: Context,
) {
  return await context.prisma.$subscribe
    .party({
      node: { id: args.partyId },
      updatedFields_contains: 'queuedTracks',
      mutation_in: ['UPDATED'],
    })
    .node();
}

async function deleteParty(_, args: { partyId: string }, context: Context) {
  const [me, party] = await Promise.all([
    context.spotify.fetchCurrentUser(),
    context.prisma.party({ id: args.partyId }),
  ]);

  const permission = getPermissionForParty(party, me);
  if (permission !== Permissions.Admin) {
    throw new GraphQLError('Only the party admin can remove a party');
  }

  await context.prisma.deleteParty({ id: args.partyId });

  return true;
}

async function requestPartyAccess(
  _,
  args: { partyId: string },
  context: Context,
) {
  const me = await context.spotify.fetchCurrentUser();
  const party = await context.prisma.party({ id: args.partyId });

  const newRequestedMembers = [...party.requestedUserIds, me.id];
  const uniqueMembers = Array.from(new Set(newRequestedMembers));

  return context.prisma.updateParty({
    where: { id: args.partyId },
    data: {
      requestedUserIds: {
        set: uniqueMembers,
      },
    },
  });
}

async function setPartyAccess(
  _,
  args: { partyId: string; userId: string; grant: boolean },
  context: Context,
) {
  const me = await context.spotify.fetchCurrentUser();
  const party = await context.prisma.party({ id: args.partyId });

  if (me.id !== party.ownerUserId) {
    throw new ForbiddenError('Not authorized');
  }

  const newRequestIds = party.requestedUserIds.filter(
    userId => userId !== args.userId,
  );

  const newMemberIds = args.grant
    ? [...party.partyUserIds, args.userId]
    : party.partyUserIds.filter(userId => userId !== args.userId);

  const updatedParty = await context.prisma.updateParty({
    where: { id: args.partyId },
    data: {
      requestedUserIds: {
        set: newRequestIds,
      },
      partyUserIds: {
        set: newMemberIds,
      },
    },
  });

  return updatedParty;
}

async function updatePartyName(
  _,
  args: { partyId: string; name: string },
  context: Context,
) {
  const party = await context.prisma.updateParty({
    where: { id: args.partyId },
    data: {
      name: args.name,
    },
  });

  return party;
}

export default {
  Query: {
    parties,
    party,
  },
  Mutation: {
    createParty,
    addTracks,
    updatePartyName,
    deleteParty,
    requestPartyAccess,
    setPartyAccess,
  },
  Me: {
    parties,
  },
  Party: {
    permission: async (root: Party, args, context: Context) => {
      const me = await context.spotify.fetchCurrentUser();
      const permission = getPermissionForParty(root, me);

      return permission;
    },
  },
  Subscription: {
    party: {
      subscribe: partySubscription,
      resolve: payload => payload,
    },
    partyTracksChanged: {
      resolve: (payload: TracksChangedPayload) => {
        return payload.changedTrackIds;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator(PubsubEvents.PartyTracksChanged),
        (payload: TracksChangedPayload, variables: { partyId: string }) =>
          payload.partyId === variables.partyId,
      ),
    },
  },
};
