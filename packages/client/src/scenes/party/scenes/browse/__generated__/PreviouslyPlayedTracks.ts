/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PreviouslyPlayedTracks
// ====================================================

export interface PreviouslyPlayedTracks_previousTracks_artists {
  id: string;
  name: string;
}

export interface PreviouslyPlayedTracks_previousTracks_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface PreviouslyPlayedTracks_previousTracks {
  artists: PreviouslyPlayedTracks_previousTracks_artists[];
  images: PreviouslyPlayedTracks_previousTracks_images[] | null;
  id: string;
  name: string;
  uri: string;
  isFavorited: boolean | null;
}

export interface PreviouslyPlayedTracks {
  previousTracks: PreviouslyPlayedTracks_previousTracks[];
}

export interface PreviouslyPlayedTracksVariables {
  partyId: string;
  offset?: number | null;
  limit?: number | null;
}
