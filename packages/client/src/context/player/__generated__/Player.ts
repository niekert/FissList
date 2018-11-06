/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Player
// ====================================================

export interface Player_player_item_artists {
  id: string;
  name: string;
}

export interface Player_player_item_images {
  url: string;
  width: number | null;
  height: number | null;
}

export interface Player_player_item {
  artists: Player_player_item_artists[];
  images: Player_player_item_images[] | null;
  id: string;
  name: string;
  uri: string;
}

export interface Player_player_device {
  id: string;
  name: string;
  isRestricted: boolean;
  type: string;
}

export interface Player_player_devices {
  id: string;
  name: string;
  isRestricted: boolean;
  type: string;
}

export interface Player_player {
  isPlaying: boolean;
  item: Player_player_item | null;
  device: Player_player_device | null;
  devices: Player_player_devices[] | null;
}

export interface Player {
  player: Player_player | null;
}
