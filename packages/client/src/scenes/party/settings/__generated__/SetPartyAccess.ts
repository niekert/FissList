/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SetPartyAccess
// ====================================================

export interface SetPartyAccess_setPartyAccess_playlist_tracks_items_track_artists {
  id: string;
  name: string;
}

export interface SetPartyAccess_setPartyAccess_playlist_tracks_items_track_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface SetPartyAccess_setPartyAccess_playlist_tracks_items_track {
  artists: SetPartyAccess_setPartyAccess_playlist_tracks_items_track_artists[];
  images: SetPartyAccess_setPartyAccess_playlist_tracks_items_track_images[] | null;
  id: string;
  name: string;
  uri: string;
}

export interface SetPartyAccess_setPartyAccess_playlist_tracks_items {
  addedAt: string;
  track: SetPartyAccess_setPartyAccess_playlist_tracks_items_track;
}

export interface SetPartyAccess_setPartyAccess_playlist_tracks {
  items: SetPartyAccess_setPartyAccess_playlist_tracks_items[];
  total: number;
  href: string;
}

export interface SetPartyAccess_setPartyAccess_playlist {
  name: string;
  id: string;
  tracks: SetPartyAccess_setPartyAccess_playlist_tracks;
}

export interface SetPartyAccess_setPartyAccess {
  id: string;
  activeTrackIndex: number | null;
  name: string;
  playlistId: string;
  permission: Permissions;
  requestedUserIds: string[] | null;
  ownerUserId: string;
  partyUserIds: string[] | null;
  playlist: SetPartyAccess_setPartyAccess_playlist;
}

export interface SetPartyAccess {
  setPartyAccess: SetPartyAccess_setPartyAccess | null;
}

export interface SetPartyAccessVariables {
  partyId: string;
  userId: string;
  grant: boolean;
}
