import { Context, Party } from '../types';
import { Playlist } from '../spotify';

export async function party(
  root,
  args: { partyId: string },
  context: Context,
  info,
): Promise<Party> {
  const party = await context.prisma.party({ id: args.partyId });

  const { data: playlist } = await context.spotify.fetchResource<Playlist>(
    `/playlists/${party.playlistId}`,
  );

  console.log(playlist.tracks.items);

  return {
    id: party.id,
    playlistId: party.playlistId,
    playlist,
  };
}
