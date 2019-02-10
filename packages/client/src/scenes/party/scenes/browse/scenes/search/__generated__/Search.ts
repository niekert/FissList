/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Search
// ====================================================

export interface Search_search_tracks_items_artists {
  id: string;
  name: string;
}

export interface Search_search_tracks_items_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface Search_search_tracks_items {
  artists: Search_search_tracks_items_artists[];
  images: Search_search_tracks_items_images[] | null;
  id: string;
  name: string;
  uri: string;
  isFavorited: boolean | null;
}

export interface Search_search_tracks {
  items: Search_search_tracks_items[];
  offset: number;
  total: number;
  limit: number;
  next: string | null;
}

export interface Search_search {
  tracks: Search_search_tracks | null;
}

export interface Search {
  search: Search_search;
}

export interface SearchVariables {
  query: string;
}
