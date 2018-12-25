/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetPartyById
// ====================================================

export interface GetPartyById_party_queuedTracks {
  uri: string;
  voteCount: number;
}

export interface GetPartyById_party {
  id: string;
  name: string;
  permission: Permissions;
  requestedUserIds: string[] | null;
  ownerUserId: string;
  partyUserIds: string[] | null;
  queuedTracks: GetPartyById_party_queuedTracks[];
}

export interface GetPartyById {
  party: GetPartyById_party;
}

export interface GetPartyByIdVariables {
  partyId: string;
}
