/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Player
// ====================================================

export interface Player_player_devices {
  id: string;
  name: string;
  isRestricted: boolean;
  type: string;
}

export interface Player_player {
  isPlaying: boolean;
  devices: Player_player_devices[];
}

export interface Player {
  player: Player_player | null;
}
