import { Context, Party } from '../types';
import { Playlist } from '../spotify';

interface PartyResult {
  id: string;
  playlistId: string;
  name: string;
  playlist: {
    id: string;
  };
}

async function party(
  root,
  args: { partyId: string },
  context: Context,
): Promise<PartyResult> {
  console.log('party is', args);
  const party = await context.prisma.party({ id: args.partyId });

  return {
    id: party.id,
    name: party.name,
    playlistId: party.playlistId,
    playlist: { id: party.playlistId },
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
    ownerUserId: user.id,
  });
}

export default {
  Query: {
    parties,
    party,
  },
  Mutation: {
    createParty,
  },
  Me: {
    parties,
  },
};
