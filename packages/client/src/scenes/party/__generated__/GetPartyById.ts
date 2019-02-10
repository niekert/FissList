/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetPartyById
// ====================================================

export interface GetPartyById_party_activeTrack_artists {
  id: string;
  name: string;
}

export interface GetPartyById_party_activeTrack_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface GetPartyById_party_activeTrack {
  artists: GetPartyById_party_activeTrack_artists[];
  images: GetPartyById_party_activeTrack_images[] | null;
  id: string;
  name: string;
  uri: string;
  isFavorited: boolean | null;
}

export interface GetPartyById_party {
  id: string;
  name: string;
  permission: Permissions;
  activeTrack: GetPartyById_party_activeTrack;
  activeTrackId: string;
  requestedUserIds: string[];
  ownerUserId: string;
  partyUserIds: string[];
  userCount: number;
  updatedAt: string;
}

export interface GetPartyById {
  party: GetPartyById_party;
}

export interface GetPartyByIdVariables {
  partyId: string;
}
