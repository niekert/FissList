/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetPartyById
// ====================================================

export interface GetPartyById_party_playlist_tracks_items_track_artists {
  id: string;
  name: string;
}

export interface GetPartyById_party_playlist_tracks_items_track_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface GetPartyById_party_playlist_tracks_items_track {
  artists: GetPartyById_party_playlist_tracks_items_track_artists[];
  images: GetPartyById_party_playlist_tracks_items_track_images[] | null;
  id: string;
  name: string;
  uri: string;
}

export interface GetPartyById_party_playlist_tracks_items {
  addedAt: string;
  track: GetPartyById_party_playlist_tracks_items_track;
}

export interface GetPartyById_party_playlist_tracks {
  items: GetPartyById_party_playlist_tracks_items[];
  total: number;
  href: string;
}

export interface GetPartyById_party_playlist {
  name: string;
  id: string;
  tracks: GetPartyById_party_playlist_tracks;
}

export interface GetPartyById_party {
  id: string;
  activeTrackIndex: number | null;
  name: string;
  playlistId: string;
  permission: Permissions;
  requestedUserIds: string[] | null;
  ownerUserId: string;
  partyUserIds: string[] | null;
  playlist: GetPartyById_party_playlist;
}

export interface GetPartyById {
  party: GetPartyById_party;
}

export interface GetPartyByIdVariables {
  partyId: string;
}
