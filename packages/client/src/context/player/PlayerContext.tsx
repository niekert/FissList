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
  togglePlayState: (options: TogglePlayStateOptions) => void;
  webSdkDeviceId?: string;
  setActiveDevice: (deviceId: string) => void;
};

export default createContext<PlayerContextValue | undefined>(undefined);
