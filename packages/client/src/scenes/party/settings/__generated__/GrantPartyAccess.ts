/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: GrantPartyAccess
// ====================================================

export interface GrantPartyAccess_grantPartyAccess_playlist_tracks_items_track_artists {
  id: string;
  name: string;
}

export interface GrantPartyAccess_grantPartyAccess_playlist_tracks_items_track_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface GrantPartyAccess_grantPartyAccess_playlist_tracks_items_track {
  artists: GrantPartyAccess_grantPartyAccess_playlist_tracks_items_track_artists[];
  images: GrantPartyAccess_grantPartyAccess_playlist_tracks_items_track_images[] | null;
  id: string;
  name: string;
  uri: string;
}

export interface GrantPartyAccess_grantPartyAccess_playlist_tracks_items {
  addedAt: string;
  track: GrantPartyAccess_grantPartyAccess_playlist_tracks_items_track;
}

export interface GrantPartyAccess_grantPartyAccess_playlist_tracks {
  items: GrantPartyAccess_grantPartyAccess_playlist_tracks_items[];
  total: number;
  href: string;
}

export interface GrantPartyAccess_grantPartyAccess_playlist {
  name: string;
  id: string;
  tracks: GrantPartyAccess_grantPartyAccess_playlist_tracks;
}

export interface GrantPartyAccess_grantPartyAccess {
  id: string;
  activeTrackIndex: number | null;
  name: string;
  playlistId: string;
  permission: Permissions;
  requestedUserIds: string[] | null;
  ownerUserId: string;
  partyUserIds: string[] | null;
  playlist: GrantPartyAccess_grantPartyAccess_playlist;
}

export interface GrantPartyAccess {
  grantPartyAccess: GrantPartyAccess_grantPartyAccess | null;
}

export interface GrantPartyAccessVariables {
  partyId: string;
  userId: string;
}
