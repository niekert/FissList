/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetParty
// ====================================================

export interface GetParty_party_playlist_tracks_items_track_artists {
  id: string;
  name: string;
}

export interface GetParty_party_playlist_tracks_items_track_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface GetParty_party_playlist_tracks_items_track {
  artists: GetParty_party_playlist_tracks_items_track_artists[];
  images: GetParty_party_playlist_tracks_items_track_images[] | null;
  id: string;
  name: string;
  uri: string;
}

export interface GetParty_party_playlist_tracks_items {
  addedAt: string;
  track: GetParty_party_playlist_tracks_items_track;
}

export interface GetParty_party_playlist_tracks {
  items: GetParty_party_playlist_tracks_items[];
  total: number;
  href: string;
}

export interface GetParty_party_playlist {
  name: string;
  id: string;
  tracks: GetParty_party_playlist_tracks;
}

export interface GetParty_party {
  id: string;
  activeTrackIndex: number | null;
  name: string;
  playlistId: string;
  playlist: GetParty_party_playlist;
}

export interface GetParty {
  party: GetParty_party;
}

export interface GetPartyVariables {
  partyId: string;
}
