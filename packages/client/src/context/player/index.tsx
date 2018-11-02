import * as React from 'react';
import Playercontext from './PlayerContext';
import TogglePlayingmutation from './TogglePlayStateMutation';
import PlayerQuery from './PlayerQuery';
import PlayerContext, { PlayerContextValue } from './PlayerContext';

export const Context = Playercontext;

interface IProps {
  children: React.ReactNode;
}

export function PlayerContainer({ children }: IProps) {
  return (
    <TogglePlayingmutation>
      {togglePlayState => (
        <PlayerQuery>
          {result => (
            <PlayerContext.Provider value={{ ...result, togglePlayState }}>
              {children}
            </PlayerContext.Provider>
          )}
        </PlayerQuery>
      )}
    </TogglePlayingmutation>
  );
}

export type PlayerContextValue = PlayerContextValue;

export function usePlayer(): PlayerContextValue | undefined {
  return React.useContext<PlayerContextValue | undefined>(PlayerContext);
}
