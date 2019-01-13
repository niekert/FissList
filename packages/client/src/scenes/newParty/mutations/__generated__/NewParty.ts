/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: NewParty
// ====================================================

export interface NewParty_createParty_queuedTracks {
  trackId: string;
  userVotes: string[];
}

export interface NewParty_createParty {
  id: string;
  name: string;
  permission: Permissions;
  requestedUserIds: string[] | null;
  ownerUserId: string;
  partyUserIds: string[] | null;
  queuedTracks: NewParty_createParty_queuedTracks[];
}

export interface NewParty {
  createParty: NewParty_createParty | null;
}

export interface NewPartyVariables {
  name: string;
  trackUris?: string[] | null;
  playlistId: string;
}
