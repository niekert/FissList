/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: PartyTracksChangedSubscription
// ====================================================

export interface PartyTracksChangedSubscription_partyTracksChanged {
  partyId: string;
  addedTrackIds: string[] | null;
  deletedTrackIds: string[] | null;
}

export interface PartyTracksChangedSubscription {
  partyTracksChanged: PartyTracksChangedSubscription_partyTracksChanged | null;
}

export interface PartyTracksChangedSubscriptionVariables {
  partyId: string;
}
