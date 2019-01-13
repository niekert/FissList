/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: PartyInfo
// ====================================================

export interface PartyInfo_queuedTracks {
  trackId: string;
  userVotes: string[];
}

export interface PartyInfo {
  id: string;
  name: string;
  permission: Permissions;
  requestedUserIds: string[] | null;
  ownerUserId: string;
  partyUserIds: string[] | null;
  queuedTracks: PartyInfo_queuedTracks[];
}
