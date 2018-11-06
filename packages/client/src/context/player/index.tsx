import * as React from 'react';
import Playercontext from './PlayerContext';
import TogglePlayingmutation from './TogglePlayStateMutation';
import SetActiveDeviceMutation from './SetDeviceMutation';
import PlayerQuery from './PlayerQuery';
import PlayerContext, { PlayerContextValue } from './PlayerContext';

export const Context = Playercontext;

interface IProps {
  children: React.ReactNode;
}

export function PlayerContainer({ children }: IProps) {
  // need HOOKS for graphql smh
  return (
    <SetActiveDeviceMutation>
      {setActiveDevice => (
        <TogglePlayingmutation>
          {togglePlayState => (
            <PlayerQuery>
              {result => (
                <PlayerContext.Provider
                  value={{ ...result, setActiveDevice, togglePlayState }}
                >
                  {children}
                </PlayerContext.Provider>
              )}
            </PlayerQuery>
          )}
        </TogglePlayingmutation>
      )}
    </SetActiveDeviceMutation>
  );
}

export type PlayerContextValue = PlayerContextValue;

export function usePlayer(): PlayerContextValue | undefined {
  return React.useContext<PlayerContextValue | undefined>(PlayerContext);
}
