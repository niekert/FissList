/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SetPartyAccess
// ====================================================

export interface SetPartyAccess_setPartyAccess {
  id: string;
  name: string;
  permission: Permissions;
  activeTrackId: string | null;
  requestedUserIds: string[] | null;
  ownerUserId: string;
  partyUserIds: string[] | null;
}

export interface SetPartyAccess {
  setPartyAccess: SetPartyAccess_setPartyAccess | null;
}

export interface SetPartyAccessVariables {
  partyId: string;
  userId: string;
  grant: boolean;
}
