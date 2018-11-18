/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: PartySubscription
// ====================================================

export interface PartySubscription_party_playlist_tracks_items_track_artists {
  id: string;
  name: string;
}

export interface PartySubscription_party_playlist_tracks_items_track_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface PartySubscription_party_playlist_tracks_items_track {
  artists: PartySubscription_party_playlist_tracks_items_track_artists[];
  images: PartySubscription_party_playlist_tracks_items_track_images[] | null;
  id: string;
  name: string;
  uri: string;
}

export interface PartySubscription_party_playlist_tracks_items {
  addedAt: string;
  track: PartySubscription_party_playlist_tracks_items_track;
}

export interface PartySubscription_party_playlist_tracks {
  items: PartySubscription_party_playlist_tracks_items[];
  total: number;
  href: string;
}

export interface PartySubscription_party_playlist {
  name: string;
  id: string;
  tracks: PartySubscription_party_playlist_tracks;
}

export interface PartySubscription_party {
  id: string;
  activeTrackIndex: number | null;
  name: string;
  playlistId: string;
  playlist: PartySubscription_party_playlist;
}

export interface PartySubscription {
  party: PartySubscription_party | null;
}

export interface PartySubscriptionVariables {
  partyId: string;
}
