/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: NewParty
// ====================================================

export interface NewParty_createParty {
  id: string;
  name: string;
  permission: Permissions;
  activeTrackId: string | null;
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
