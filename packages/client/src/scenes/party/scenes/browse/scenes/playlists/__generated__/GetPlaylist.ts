/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlaylist
// ====================================================

export interface GetPlaylist_playlist_tracks_items_track_artists {
  id: string;
  name: string;
}

export interface GetPlaylist_playlist_tracks_items_track_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface GetPlaylist_playlist_tracks_items_track {
  artists: GetPlaylist_playlist_tracks_items_track_artists[];
  images: GetPlaylist_playlist_tracks_items_track_images[] | null;
  id: string;
  name: string;
  uri: string;
  isFavorited: boolean | null;
}

export interface GetPlaylist_playlist_tracks_items {
  addedAt: string;
  track: GetPlaylist_playlist_tracks_items_track;
}

export interface GetPlaylist_playlist_tracks {
  items: GetPlaylist_playlist_tracks_items[];
  total: number;
  href: string;
}

export interface GetPlaylist_playlist {
  name: string;
  id: string;
  tracks: GetPlaylist_playlist_tracks;
}

export interface GetPlaylist {
  playlist: GetPlaylist_playlist;
}

export interface GetPlaylistVariables {
  playlistId: string;
}
