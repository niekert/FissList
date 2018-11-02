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
  href: string;
  total: number;
  items: GetParty_party_playlist_tracks_items[];
}

export interface GetParty_party_playlist {
  id: string;
  uri: string;
  tracks: GetParty_party_playlist_tracks;
}

export interface GetParty_party {
  id: string;
  name: string;
  playlistId: string;
  playlist: GetParty_party_playlist | null;
}

export interface GetParty {
  party: GetParty_party;
}

export interface GetPartyVariables {
  partyId: string;
}
