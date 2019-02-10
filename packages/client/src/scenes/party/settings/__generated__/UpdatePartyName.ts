/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePartyName
// ====================================================

export interface UpdatePartyName_updatePartyName_activeTrack_artists {
  id: string;
  name: string;
}

export interface UpdatePartyName_updatePartyName_activeTrack_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface UpdatePartyName_updatePartyName_activeTrack {
  artists: UpdatePartyName_updatePartyName_activeTrack_artists[];
  images: UpdatePartyName_updatePartyName_activeTrack_images[] | null;
  id: string;
  name: string;
  uri: string;
  isFavorited: boolean | null;
}

export interface UpdatePartyName_updatePartyName {
  id: string;
  name: string;
  permission: Permissions;
  activeTrack: UpdatePartyName_updatePartyName_activeTrack;
  activeTrackId: string;
  requestedUserIds: string[];
  ownerUserId: string;
  partyUserIds: string[];
  userCount: number;
  updatedAt: string;
}

export interface UpdatePartyName {
  updatePartyName: UpdatePartyName_updatePartyName | null;
}

export interface UpdatePartyNameVariables {
  partyId: string;
  name: string;
}
