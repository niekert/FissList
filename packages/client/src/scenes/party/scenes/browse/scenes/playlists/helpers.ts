import { PlaylistInfo } from 'fragments/__generated__/PlaylistInfo';
import { TrackInfo } from 'fragments/__generated__/TrackInfo';

export function mapPlaylistTracks(playlist: PlaylistInfo): TrackInfo[] {
  return playlist.tracks.items.map(playlistTrack => playlistTrack.track);
}
