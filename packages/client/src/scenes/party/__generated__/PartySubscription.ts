/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: PartySubscription
// ====================================================

export interface PartySubscription_party_queuedTracks {
  uri: string;
  voteCount: number;
}

export interface PartySubscription_party {
  id: string;
  name: string;
  permission: Permissions;
  requestedUserIds: string[] | null;
  ownerUserId: string;
  partyUserIds: string[] | null;
  queuedTracks: PartySubscription_party_queuedTracks[];
}

export interface PartySubscription {
  party: PartySubscription_party | null;
}

export interface PartySubscriptionVariables {
  partyId: string;
}
