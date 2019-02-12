/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Player
// ====================================================

export interface Player_player_device {
  id: string | null;
  name: string;
  isRestricted: boolean;
  type: string;
}

export interface Player_player_devices {
  id: string | null;
  name: string;
  isRestricted: boolean;
  type: string;
}

export interface Player_player {
  isPlaying: boolean;
  device: Player_player_device | null;
  devices: Player_player_devices[] | null;
}

export interface Player {
  player: Player_player | null;
}
