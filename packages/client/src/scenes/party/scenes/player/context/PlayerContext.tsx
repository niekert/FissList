import { createContext } from 'react';
import { PlayerQueryResult } from './usePlayerQuery';

export interface TogglePlayStateOptions {
  type: string;
  partyId: string;
  uris?: string[];
  playlistUri?: string;
  offsetUri?: string;
  contextUri?: string;
}

export type PlayerContextValue = PlayerQueryResult & {
  startPlayback: () => void;
  skipTrack: () => void;
  pausePlayback: () => void;
  setActiveDevice: (deviceId: string) => void;
};

export default createContext<PlayerContextValue | undefined>(undefined);
