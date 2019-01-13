/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePartyName
// ====================================================

export interface UpdatePartyName_updatePartyName_queuedTracks {
  trackId: string;
  userVotes: string[];
}

export interface UpdatePartyName_updatePartyName {
  id: string;
  name: string;
  permission: Permissions;
  requestedUserIds: string[] | null;
  ownerUserId: string;
  partyUserIds: string[] | null;
  queuedTracks: UpdatePartyName_updatePartyName_queuedTracks[];
}

export interface UpdatePartyName {
  updatePartyName: UpdatePartyName_updatePartyName | null;
}

export interface UpdatePartyNameVariables {
  partyId: string;
  name: string;
}
