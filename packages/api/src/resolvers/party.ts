import { Context, Party } from '../types';
import { Playlist } from '../spotify';
import { withFilter } from 'graphql-subscriptions';
import pubsub, { PubsubEvents } from '../pubsub';

interface PartyResult {
  id: string;
  playlistId: string;
  name: string;
  activeTrackIndex: number;
  createdAt: string;
  updatedAt: string;
  playlist: {
    id: string;
  };
}

interface TracksChangedPayload {
  partyId: string;
  changedTrackIds: string[];
}

async function party(
  root,
  args: { partyId: string },
  context: Context,
): Promise<PartyResult> {
  const party = await context.prisma.party({ id: args.partyId });

  return {
    id: party.id,
    name: party.name,
    playlistId: party.playlistId,
    playlist: { id: party.playlistId },
    createdAt: party.createdAt,
    updatedAt: party.updatedAt,
    activeTrackIndex: party.activeTrackIndex,
  };
}

async function parties(
  root,
  args: { ids: [string] },
  context: Context,
): Promise<PartyResult[]> {
  const parties = await context.prisma.parties({ where: { id_in: args.ids } });

  return parties.map(party => ({
    id: party.id!,
    name: party.name!,
    activeTrackIndex: 0,
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
