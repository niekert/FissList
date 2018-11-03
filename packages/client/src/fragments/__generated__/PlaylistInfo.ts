/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlaylistInfo
// ====================================================

export interface PlaylistInfo_tracks_items_track_artists {
  id: string;
  name: string;
}

export interface PlaylistInfo_tracks_items_track_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface PlaylistInfo_tracks_items_track {
  artists: PlaylistInfo_tracks_items_track_artists[];
  images: PlaylistInfo_tracks_items_track_images[] | null;
  id: string;
  name: string;
  uri: string;
}

export interface PlaylistInfo_tracks_items {
  addedAt: string;
  track: PlaylistInfo_tracks_items_track;
}

export interface PlaylistInfo_tracks {
  items: PlaylistInfo_tracks_items[];
  total: number;
  href: string;
}

export interface PlaylistInfo {
  name: string;
  id: string;
  tracks: PlaylistInfo_tracks;
}
