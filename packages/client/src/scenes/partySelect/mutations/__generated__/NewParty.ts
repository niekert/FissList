/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NewParty
// ====================================================

export interface NewParty_createParty {
  id: string;
  name: string;
  basePlaylistId: string;
}

export interface NewParty {
  createParty: NewParty_createParty | null;
}

export interface NewPartyVariables {
  name: string;
  basePlaylistId: string;
}
