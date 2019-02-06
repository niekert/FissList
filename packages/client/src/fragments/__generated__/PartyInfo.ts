/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: PartyInfo
// ====================================================

export interface PartyInfo_activeTrack_artists {
  id: string;
  name: string;
}

export interface PartyInfo_activeTrack_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface PartyInfo_activeTrack {
  artists: PartyInfo_activeTrack_artists[];
  images: PartyInfo_activeTrack_images[] | null;
  id: string;
  name: string;
  uri: string;
}

export interface PartyInfo {
  id: string;
  name: string;
  permission: Permissions;
  activeTrack: PartyInfo_activeTrack;
  activeTrackId: string;
  requestedUserIds: string[] | null;
  ownerUserId: string;
  partyUserIds: string[] | null;
}
