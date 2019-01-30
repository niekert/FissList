/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: PartyInfo
// ====================================================

export interface PartyInfo {
  id: string;
  name: string;
  permission: Permissions;
  activeTrackId: string | null;
  requestedUserIds: string[] | null;
  ownerUserId: string;
  partyUserIds: string[] | null;
}
