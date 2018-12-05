import { Context, SpotifyUser } from '../types';
import { PartyNode } from '../generated/prisma-client';
import { ForbiddenError } from 'apollo-server';
import { Playlist } from '../spotify';
import { withFilter } from 'graphql-subscriptions';
import pubsub, { PubsubEvents } from '../pubsub';
import { GraphQLError } from 'graphql';

interface PartyResult {
  id: string;
  playlistId: string;
  name: string;
  activeTrackIndex: number;
  createdAt: string;
  updatedAt: string;
  permission: string;
  playlist: {
    id: string;
  };
}

enum Permissions {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  None = 'NONE',
}

const getPermissionForParty = (
  party: PartyNode,
  user: SpotifyUser,
): Permissions => {
  if (party.ownerUserId === user.id) {
    return Permissions.Admin;
  }

  if (party.partyMemberIds.includes(user.id)) {
    return Permissions.Member;
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
  if (permission === Permissions.None) {
    throw new ForbiddenError('Unauthorized to join the party');
  }

  return {
    id: party.id,
    name: party.name,
    permission: getPermissionForParty(party, user),
    playlistId: party.playlistId,
    playlist: { id: party.playlistId },
    createdAt: party.createdAt,
    updatedAt: party.updatedAt,
    activeTrackIndex: party.activeTrackIndex,
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
    createdAt: party.createdAt,
    updatedAt: party.updatedAt,
    playlistId: party.playlistId!,
    playlist: {
      id: party.playlistId!,
    },
  }));
}

async function createParty(
  _,
  args: { name: string; playlistId: string },
  context: Context,
) {
  const { name, playlistId } = args;
  await new Promise(resolve => setTimeout(resolve, 700));
  const user = await context.spotify.fetchCurrentUser();

  const { data } = await context.spotify.fetchResource<Playlist>(
    `/playlists/${playlistId}`,
  );

  const trackUris = data.tracks.items.map(
    playListTrack => playListTrack.track.uri,
  );

  // Create a new playlist
  const { data: partyPlaylist } = await context.spotify.fetchResource<Playlist>(
    `/users/${user.id}/playlists`,
    {
      method: 'POST',
      body: JSON.stringify({
        name,
        public: false,
        collaborative: true,
      }),
    },
  );

  // Add tracks from base playlist
  await context.spotify.fetchResource(`/playlists/${partyPlaylist.id}/tracks`, {
    method: 'POST',
    body: JSON.stringify({
      uris: trackUris,
    }),
  });

  return context.prisma.createParty({
    name,
    playlistId: partyPlaylist.id,
    trackUris: {
      set: trackUris,
    },
    ownerUserId: user.id,
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

  if (party.ownerUserId !== me.id || !party.partyMemberIds.includes(me.id)) {
    throw new GraphQLError('Unauthorized to change the party');
  }

  const playlist = await context.spotify.fetchResource<Playlist>(
    `/playlists/${party.playlistId}`,
  );
  const currentTrackIds = playlist.data.tracks.items.map(
    playlistTrack => playlistTrack.track.id,
  );
  const activeTrackIndex = party.activeTrackIndex || 0;

  // TODO: Something with track weight when it's voted for twice.
  const filteredNewTracks = args.trackIds.filter(
    trackId => !currentTrackIds.includes(trackId),
  );

  const newTrackOrder = [
    ...currentTrackIds.slice(0, activeTrackIndex + 1),
    ...filteredNewTracks,
    ...currentTrackIds.slice(activeTrackIndex + 1),
  ];

  const trackUris = newTrackOrder.map(trackId => `spotify:track:${trackId}`);

  await context.spotify.fetchResource(`/playlists/${party.playlistId}/tracks`, {
    method: 'PUT',
    body: JSON.stringify({
      uris: trackUris,
    }),
  });

  await context.prisma.updateParty({
    where: { id: args.partyId },
    data: {
      trackUris: {
        set: trackUris,
      },
    },
  });
  await context.prisma.party({ id: args.partyId });

  pubsub.publish(PubsubEvents.PartyTracksChanged, {
    partyId: args.partyId,
    changedTrackIds: filteredNewTracks,
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

async function updatePartyName(
  _,
  args: { partyId: string; name: string },
  context: Context,
) {
  return context.prisma.updateParty({
    where: { id: args.partyId },
    data: {
      name: args.name,
    },
  });
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
  },
  Me: {
    parties,
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
