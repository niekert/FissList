import { Context } from '../types';
import { Playlist } from '../spotify';

export async function createParty(
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

  console.log('created playlist', partyPlaylist);

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
