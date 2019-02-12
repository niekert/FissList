/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: NewParty
// ====================================================

export interface NewParty_createParty_activeTrack_artists {
  id: string;
  name: string;
}

export interface NewParty_createParty_activeTrack_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface NewParty_createParty_activeTrack {
  artists: NewParty_createParty_activeTrack_artists[];
  images: NewParty_createParty_activeTrack_images[] | null;
  id: string;
  name: string;
  uri: string;
  isFavorited: boolean | null;
}

export interface NewParty_createParty {
  id: string;
  name: string;
  permission: Permissions;
  activeTrack: NewParty_createParty_activeTrack | null;
  activeTrackId: string;
  requestedUserIds: string[];
  ownerUserId: string;
  partyUserIds: string[];
  userCount: number;
  updatedAt: string;
}

export interface NewParty {
  createParty: NewParty_createParty | null;
}

export interface NewPartyVariables {
  name: string;
  trackUris?: string[] | null;
  playlistId: string;
}
