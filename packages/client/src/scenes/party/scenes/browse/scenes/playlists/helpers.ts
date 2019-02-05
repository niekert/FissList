import { PlaylistInfo } from 'fragments/__generated__/PlaylistInfo';
import { TrackInfo } from 'fragments/__generated__/TrackInfo';

export function mapPlaylistTracks(playlist: PlaylistInfo): TrackInfo[] {
  const retVal = playlist.tracks.items.map(
    playlistTrack => playlistTrack.track,
  );
  console.log('retVal', retVal);

  return retVal;
}
