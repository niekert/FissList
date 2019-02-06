/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SetPartyAccess
// ====================================================

export interface SetPartyAccess_setPartyAccess_activeTrack_artists {
  id: string;
  name: string;
}

export interface SetPartyAccess_setPartyAccess_activeTrack_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface SetPartyAccess_setPartyAccess_activeTrack {
  artists: SetPartyAccess_setPartyAccess_activeTrack_artists[];
  images: SetPartyAccess_setPartyAccess_activeTrack_images[] | null;
  id: string;
  name: string;
  uri: string;
}

export interface SetPartyAccess_setPartyAccess {
  id: string;
  name: string;
  permission: Permissions;
  activeTrack: SetPartyAccess_setPartyAccess_activeTrack;
  activeTrackId: string;
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
