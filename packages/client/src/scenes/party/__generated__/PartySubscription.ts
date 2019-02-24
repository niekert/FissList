/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: PartySubscription
// ====================================================

export interface PartySubscription_party_activeTrack_artists {
  id: string;
  name: string;
}

export interface PartySubscription_party_activeTrack_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface PartySubscription_party_activeTrack {
  artists: PartySubscription_party_activeTrack_artists[];
  images: PartySubscription_party_activeTrack_images[] | null;
  id: string;
  name: string;
  uri: string;
  isFavorited: boolean | null;
}

export interface PartySubscription_party {
  id: string;
  name: string;
  permission: Permissions;
  activeTrack: PartySubscription_party_activeTrack | null;
  activeTrackId: string;
  requestedUsersCount: number;
  ownerUserId: string;
  userCount: number;
  updatedAt: string;
}

export interface PartySubscription {
  party: PartySubscription_party | null;
}

export interface PartySubscriptionVariables {
  partyId: string;
}
