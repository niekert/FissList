import * as React from 'react';
import PlayerContext, { PlayerContextValue } from './PlayerContext';
import { PlayerContainer as SpotifyConnectContainer } from './SpotifyConnectPlayer';
import { WebSdkPlayerContainer } from './WebSdkPlayer';

export const PlayerContainer = WebSdkPlayerContainer;

export type PlayerContextValue = PlayerContextValue;

export function usePlayer(): PlayerContextValue | undefined {
  return React.useContext<PlayerContextValue | undefined>(PlayerContext);
}
