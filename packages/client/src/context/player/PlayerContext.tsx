import { createContext } from 'react';
import { PlayerQueryResult } from './PlayerQuery';
import { TogglePlayingMutationFn } from './TogglePlayStateMutation';
import { SetActiveDeviceMutationFn } from './SetDeviceMutation';

export type PlayerContextValue = PlayerQueryResult & {
  togglePlayState: TogglePlayingMutationFn;
  setActiveDevice: SetActiveDeviceMutationFn;
};

export default createContext<PlayerContextValue | undefined>(undefined);
