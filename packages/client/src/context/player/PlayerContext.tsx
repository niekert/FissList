import { createContext } from 'react';
import { PlayerQueryResult } from './PlayerQuery';
import { TogglePlayingMutationFn } from './TogglePlayStateMutation';

export type PlayerContextValue = PlayerQueryResult & {
  togglePlayState: TogglePlayingMutationFn;
};

export default createContext<PlayerContextValue | undefined>(undefined);
