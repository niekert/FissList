/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddTracks
// ====================================================

export interface AddTracks_addTracks {
  id: string;
}

export interface AddTracks {
  addTracks: AddTracks_addTracks | null;
}

export interface AddTracksVariables {
  partyId: string;
  trackIds: (string | null)[];
}
