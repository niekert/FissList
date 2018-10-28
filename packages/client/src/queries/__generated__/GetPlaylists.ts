/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlaylists
// ====================================================

export interface GetPlaylists_getPlaylists_items_tracks {
  total: number;
}

export interface GetPlaylists_getPlaylists_items {
  id: string;
  href: string;
  name: string;
  thumbnail: string | null;
  tracks: GetPlaylists_getPlaylists_items_tracks;
}

export interface GetPlaylists_getPlaylists {
  href: string;
  items: GetPlaylists_getPlaylists_items[];
}

export interface GetPlaylists {
  getPlaylists: GetPlaylists_getPlaylists | null;
}
