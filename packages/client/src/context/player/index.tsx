import * as React from 'react';
import PlayerContext, { PlayerContextValue } from './PlayerContext';
import { PlayerContainer as SpotifyConnectContainer } from './SpotifyConnectPlayer';

export const PlayerContainer = SpotifyConnectContainer;

export type PlayerContextValue = PlayerContextValue;

export function usePlayer(): PlayerContextValue | undefined {
  return React.useContext<PlayerContextValue | undefined>(PlayerContext);
}
