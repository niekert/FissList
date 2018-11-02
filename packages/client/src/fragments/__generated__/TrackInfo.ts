/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TrackInfo
// ====================================================

export interface TrackInfo_artists {
  id: string;
  name: string;
}

export interface TrackInfo_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface TrackInfo {
  artists: TrackInfo_artists[];
  images: TrackInfo_images[] | null;
  id: string;
  name: string;
  uri: string;
}
