/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: PartyInfo
// ====================================================

export interface PartyInfo_playlist_tracks_items_track_artists {
  id: string;
  name: string;
}

export interface PartyInfo_playlist_tracks_items_track_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface PartyInfo_playlist_tracks_items_track {
  artists: PartyInfo_playlist_tracks_items_track_artists[];
  images: PartyInfo_playlist_tracks_items_track_images[] | null;
  id: string;
  name: string;
  uri: string;
}

export interface PartyInfo_playlist_tracks_items {
  addedAt: string;
  track: PartyInfo_playlist_tracks_items_track;
}

export interface PartyInfo_playlist_tracks {
  items: PartyInfo_playlist_tracks_items[];
  total: number;
  href: string;
}

export interface PartyInfo_playlist {
  name: string;
  id: string;
  tracks: PartyInfo_playlist_tracks;
}

export interface PartyInfo {
  id: string;
  activeTrackIndex: number | null;
  name: string;
  playlistId: string;
  permission: Permissions;
  requestedUserIds: string[] | null;
  playlist: PartyInfo_playlist;
}
