import { createContext } from 'react';
import { PlayerQueryResult } from './usePlayerQuery';
import { Player } from './__generated__/Player';

export interface TogglePlayStateOptions {
  type: string;
  partyId: string;
  uris?: string[];
  playlistUri?: string;
  offsetUri?: string;
  contextUri?: string;
}

export type PlayerContextValue = PlayerQueryResult & {
  togglePlayState: (options: TogglePlayStateOptions) => void;
  setActiveDevice: (deviceId: string) => void;
};

export default createContext<PlayerContextValue | undefined>(undefined);
