/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SavedTracks
// ====================================================

export interface SavedTracks_savedTracks_items_track_artists {
  id: string;
  name: string;
}

export interface SavedTracks_savedTracks_items_track_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface SavedTracks_savedTracks_items_track {
  artists: SavedTracks_savedTracks_items_track_artists[];
  images: SavedTracks_savedTracks_items_track_images[] | null;
  id: string;
  name: string;
  uri: string;
}

export interface SavedTracks_savedTracks_items {
  addedAt: string;
  track: SavedTracks_savedTracks_items_track;
}

export interface SavedTracks_savedTracks {
  offset: number;
  items: SavedTracks_savedTracks_items[];
}

export interface SavedTracks {
  savedTracks: SavedTracks_savedTracks;
}
