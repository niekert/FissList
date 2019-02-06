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
}

export interface NewParty_createParty {
  id: string;
  name: string;
  permission: Permissions;
  activeTrack: NewParty_createParty_activeTrack;
  activeTrackId: string;
  requestedUserIds: string[] | null;
  ownerUserId: string;
  partyUserIds: string[] | null;
}

export interface NewParty {
  createParty: NewParty_createParty | null;
}

export interface NewPartyVariables {
  name: string;
  trackUris?: string[] | null;
  playlistId: string;
}
