import { Search_search_tracks } from './__generated__/Search';
import { TrackInfo } from 'fragments/__generated__/TrackInfo';

export function mapSearchResultTracks(
  searchTracks: Search_search_tracks,
): TrackInfo[] {
  return searchTracks.items;
}
