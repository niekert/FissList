import { Context, SpotifyUser } from '../types';
import { Party, QueuedTrack } from '../generated/prisma-client';
import { ForbiddenError } from 'apollo-server';
import { withFilter } from 'graphql-subscriptions';
import pubsub, { PubsubEvents } from '../pubsub';
import { GraphQLError } from 'graphql';
import { Playlist } from '../spotify';

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

enum Permissions {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  Pending = 'PENDING',
  None = 'NONE',
}

const getPermissionForParty = (
  party: Party,
  user: SpotifyUser,
): Permissions => {
  if (party.ownerUserId === user.id) {
    return Permissions.Admin;
  }

  if (party.partyUserIds && party.partyUserIds.includes(user.id)) {
    return Permissions.Member;
  }

  if (party.requestedUserIds && party.requestedUserIds.includes(user.id)) {
    return Permissions.Pending;
  }

  return Permissions.None;
};

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

async function addTracks(
  _,
  args: { partyId: string; trackIds: string[] },
  context: Context,
) {
  const [party, me] = await Promise.all([
    context.prisma.party({ id: args.partyId }),
    context.spotify.fetchCurrentUser(),
  ]);
  const permission = getPermissionForParty(party, me);

  if (![Permissions.Admin, Permissions.Member].includes(permission)) {
    throw new GraphQLError('Unauthorized to change the party');
  }

  // await context.prisma.updateParty({
  //   where: { id: args.partyId },
  //   data: {
  //     trackUris: {
  //       set: trackUris,
  //     },
  //   },
  // });
  await context.prisma.party({ id: args.partyId });

  pubsub.publish(PubsubEvents.PartyTracksChanged, {
    partyId: args.partyId,
    changedTrackIds: [], // TODO: add changed tracks
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
    queuedTracks: async (root: Party, _, context: Context) => {
      const queuedTracks = await context.prisma
        .party({ id: root.id })
        .queuedTracks();

      return queuedTracks;
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
