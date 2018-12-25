/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SetPartyAccess
// ====================================================

export interface SetPartyAccess_setPartyAccess_queuedTracks {
  uri: string;
  voteCount: number;
}

export interface SetPartyAccess_setPartyAccess {
  id: string;
  name: string;
  permission: Permissions;
  requestedUserIds: string[] | null;
  ownerUserId: string;
  partyUserIds: string[] | null;
  queuedTracks: SetPartyAccess_setPartyAccess_queuedTracks[];
}

export interface SetPartyAccess {
  setPartyAccess: SetPartyAccess_setPartyAccess | null;
}

export interface SetPartyAccessVariables {
  partyId: string;
  userId: string;
  grant: boolean;
}
