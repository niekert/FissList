/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlaylists
// ====================================================

export interface GetPlaylists_userPlaylists_items_tracks {
  total: number;
}

export interface GetPlaylists_userPlaylists_items {
  id: string;
  href: string;
  name: string;
  thumbnail: string | null;
  tracks: GetPlaylists_userPlaylists_items_tracks;
}

export interface GetPlaylists_userPlaylists {
  href: string;
  offset: number;
  total: number;
  limit: number;
  items: GetPlaylists_userPlaylists_items[];
}

export interface GetPlaylists {
  userPlaylists: GetPlaylists_userPlaylists | null;
}

export interface GetPlaylistsVariables {
  offset?: number | null;
}
