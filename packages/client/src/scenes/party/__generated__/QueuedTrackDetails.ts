/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueuedTrackDetails
// ====================================================

export interface QueuedTrackDetails_queuedTracks_artists {
  id: string;
  name: string;
}

export interface QueuedTrackDetails_queuedTracks_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface QueuedTrackDetails_queuedTracks {
  artists: QueuedTrackDetails_queuedTracks_artists[];
  images: QueuedTrackDetails_queuedTracks_images[] | null;
  id: string;
  name: string;
  uri: string;
}

export interface QueuedTrackDetails {
  queuedTracks: QueuedTrackDetails_queuedTracks[];
}

export interface QueuedTrackDetailsVariables {
  trackIds: string[];
}
