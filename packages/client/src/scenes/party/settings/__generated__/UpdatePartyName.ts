/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePartyName
// ====================================================

export interface UpdatePartyName_updatePartyName_playlist_tracks_items_track_artists {
  id: string;
  name: string;
}

export interface UpdatePartyName_updatePartyName_playlist_tracks_items_track_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface UpdatePartyName_updatePartyName_playlist_tracks_items_track {
  artists: UpdatePartyName_updatePartyName_playlist_tracks_items_track_artists[];
  images: UpdatePartyName_updatePartyName_playlist_tracks_items_track_images[] | null;
  id: string;
  name: string;
  uri: string;
}

export interface UpdatePartyName_updatePartyName_playlist_tracks_items {
  addedAt: string;
  track: UpdatePartyName_updatePartyName_playlist_tracks_items_track;
}

export interface UpdatePartyName_updatePartyName_playlist_tracks {
  items: UpdatePartyName_updatePartyName_playlist_tracks_items[];
  total: number;
  href: string;
}

export interface UpdatePartyName_updatePartyName_playlist {
  name: string;
  id: string;
  tracks: UpdatePartyName_updatePartyName_playlist_tracks;
}

export interface UpdatePartyName_updatePartyName {
  id: string;
  activeTrackIndex: number | null;
  name: string;
  playlistId: string;
  permission: Permissions;
  playlist: UpdatePartyName_updatePartyName_playlist;
}

export interface UpdatePartyName {
  updatePartyName: UpdatePartyName_updatePartyName | null;
}

export interface UpdatePartyNameVariables {
  partyId: string;
  name: string;
}
