/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Track
// ====================================================

export interface Track_track_artists {
  id: string;
  name: string;
}

export interface Track_track_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface Track_track {
  artists: Track_track_artists[];
  images: Track_track_images[] | null;
  id: string;
  name: string;
  uri: string;
}

export interface Track {
  track: Track_track;
}

export interface TrackVariables {
  trackId: string;
}
