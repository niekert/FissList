import { v4 as uuid } from 'uuid';
import { Context, Paging, Savedtrack } from '../types';
import { Party, QueuedTrack, UserNode } from '../generated/prisma-client';
import { ForbiddenError } from 'apollo-server';
import { withFilter } from 'graphql-subscriptions';
import pubsub, { PubsubEvents } from '../pubsub';
import { GraphQLError } from 'graphql';
import { Playlist } from '../spotify';
import { Permissions, getPermissionForParty } from '../permissions';

const SAVED_MUSIC = 'saved';

interface PartyResult {
  id: string;
  activeTrackId: string;
  ownerUserId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  queuedTracks?: QueuedTrack[];
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface TracksChangedPayload {
  partyId: string;
  addedTrackIds: string[];
  removedTrackIds: string[];
}

async function party(
  root,
  args: { partyId: string },
  context: Context,
): Promise<PartyResult> {
  const user = await context.spotify.fetchCurrentUser();
  const party = await context.prisma.party({ id: args.partyId });

  return {
    id: party.id,
    name: party.name,
    activeTrackId: party.activeTrackId,
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
    orderBy: 'createdAt_DESC',
  });

  return parties.map(party => ({
    id: party.id!,
    name: party.name!,
    activeTrackIndex: 0,
    activeTrackId: party.activeTrackId,
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
  let trackIds = [];

  const { name, playlistId } = args;

  if (playlistId === SAVED_MUSIC) {
    const savedTracks = await context.spotify.fetchResource<Paging<Savedtrack>>(
      '/me/tracks?limit=50',
    );

    trackIds = savedTracks.data.items.map(item => item.track.id);
  } else {
    const playlist = await context.spotify.fetchResource<Playlist>(
      `/playlists/${playlistId}`,
    );

    trackIds = playlist.data.tracks.items.map(track => track.track.id);
  }
  const user = await context.spotify.fetchCurrentUser();

  const [firstTrackId, ...queuedTrackIds] = trackIds;

  // Pause the player
  await context.spotify.fetchResource('/me/player/pause', { method: 'PUT' });

  return context.prisma.createParty({
    name,
    ownerUserId: user.id,
    activeTrackId: firstTrackId,
    queuedTracks: {
      create: queuedTrackIds.map(trackId => ({
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

  const permission = await getPermissionForParty(context.prisma, party, me);

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
    addedTrackIds: addedTracks.map(track => track.trackId),
    deletedTrackIds: [],
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
      updatedFields_contains: 'lastTimeUsersChanged',
    })
    .node();
}

async function deleteParty(_, args: { partyId: string }, context: Context) {
  const [me, party] = await Promise.all([
    context.spotify.fetchCurrentUser(),
    context.prisma.party({ id: args.partyId }),
  ]);

  const permission = await getPermissionForParty(context.prisma, party, me);
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

  return context.prisma.updateParty({
    where: { id: args.partyId },
    data: {
      requestedUserIds: {
        create: {
          userId: me.id,
        },
      },
      // This is a hacky workaround for subscriptions to get picked up.
      // see https://www.prisma.io/docs/prisma-graphql-api/reference/subscriptions-qwe3/#relation-subscriptions
      lastTimeUsersChanged: uuid(),
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

  // Grant party access
  if (args.grant) {
    const [requesetedNode] = await context.prisma
      .party({ id: args.partyId })
      .requestedUserIds({ where: { userId: args.userId } });

    return context.prisma.updateParty({
      where: { id: args.partyId },
      data: {
        requestedUserIds: {
          delete: {
            id: requesetedNode.id,
          },
        },
        partyUserIds: {
          create: {
            userId: args.userId,
          },
        },
        // This is a hacky workaround for subscriptions to get picked up.
        // see https://www.prisma.io/docs/prisma-graphql-api/reference/subscriptions-qwe3/#relation-subscriptions
        lastTimeUsersChanged: uuid(),
      },
    });
  }

  // Remove party access
  const [partyUserNode] = await context.prisma
    .party({ id: args.partyId })
    .partyUserIds({ where: { userId: args.userId } });

  return context.prisma.updateParty({
    where: { id: args.partyId },
    data: {
      partyUserIds: {
        delete: {
          id: partyUserNode.id,
        },
      },
      // This is a hacky workaround for subscriptions to get picked up.
      // see https://www.prisma.io/docs/prisma-graphql-api/reference/subscriptions-qwe3/#relation-subscriptions
      lastTimeUsersChanged: uuid(),
    },
  });
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

async function trackVote(
  _,
  args: { queuedTrackId: string },
  context: Context,
): Promise<boolean> {
  const [me, queuedTrack] = await Promise.all([
    context.spotify.fetchCurrentUser(),
    context.prisma.queuedTrack({ id: args.queuedTrackId }),
  ]);

  const isUpvoted = queuedTrack.userVotes.includes(me.id);

  const nextUserVotes = isUpvoted
    ? queuedTrack.userVotes.filter(userId => userId !== me.id)
    : [...queuedTrack.userVotes, me.id];

  await context.prisma.updateQueuedTrack({
    where: { id: args.queuedTrackId },
    data: {
      userVotes: {
        set: nextUserVotes,
      },
    },
  });

  // Return whether the user has a vote for the track after the mutation
  return !isUpvoted;
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
    trackVote,
  },
  Me: {
    parties,
  },
  Party: {
    permission: async (root: Party, args, context: Context) => {
      const me = await context.spotify.fetchCurrentUser();
      const permission = await getPermissionForParty(context.prisma, root, me);

      return permission;
    },
    async requestedUserIds(
      root: Party,
      args,
      context: Context,
    ): Promise<string[]> {
      const requestedUsers = await context.prisma
        .party({ id: root.id })
        .requestedUserIds();

      return requestedUsers.map(user => user.userId);
    },
    async partyUserIds(root: Party, args, context: Context): Promise<string[]> {
      const partyUserIds = await context.prisma
        .party({ id: root.id })
        .partyUserIds();

      return partyUserIds.map(user => user.userId);
    },
  },
  Subscription: {
    party: {
      subscribe: partySubscription,
      resolve: (payload: Party): Party => payload,
    },
    partyTracksChanged: {
      resolve: (payload: TracksChangedPayload): TracksChangedPayload => {
        return payload;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator(PubsubEvents.PartyTracksChanged),
        (payload: TracksChangedPayload, variables: { partyId: string }) =>
          payload.partyId === variables.partyId,
      ),
    },
  },
};
