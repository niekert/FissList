/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueuedTrackDetails
// ====================================================

export interface QueuedTrackDetails_queuedTracks_track_artists {
  id: string;
  name: string;
}

export interface QueuedTrackDetails_queuedTracks_track_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface QueuedTrackDetails_queuedTracks_track {
  artists: QueuedTrackDetails_queuedTracks_track_artists[];
  images: QueuedTrackDetails_queuedTracks_track_images[] | null;
  id: string;
  name: string;
  uri: string;
}

export interface QueuedTrackDetails_queuedTracks {
  trackId: string;
  track: QueuedTrackDetails_queuedTracks_track;
  userVotes: string[];
}

export interface QueuedTrackDetails {
  queuedTracks: QueuedTrackDetails_queuedTracks[];
}

export interface QueuedTrackDetailsVariables {
  partyId: string;
}
