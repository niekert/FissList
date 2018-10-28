/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlaylists
// ====================================================

export interface GetPlaylists_getPlaylists_items_images {
  width: number | null;
  height: number | null;
  url: string;
}

export interface GetPlaylists_getPlaylists_items {
  id: string;
  href: string;
  name: string;
  images: (GetPlaylists_getPlaylists_items_images | null)[] | null;
}

export interface GetPlaylists_getPlaylists {
  href: string;
  items: GetPlaylists_getPlaylists_items[];
}

export interface GetPlaylists {
  getPlaylists: GetPlaylists_getPlaylists | null;
}
