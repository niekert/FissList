import * as React from 'react';
import { usePlayerQuery, PLAYER_QUERY } from './usePlayerQuery';
import {
  useSetActiveDeviceMutation,
  useSetTogglePlayStateMutation,
} from './mutations';
import PlayerContext, { TogglePlayStateOptions } from './PlayerContext';

interface IProps {
  children: React.ReactNode;
}

export function PlayerContainer({ children }: IProps) {
  // need HOOKS for graphql smh
  const player = usePlayerQuery();
  const setActiveDevice = useSetActiveDeviceMutation();
  const togglePlayState = useSetTogglePlayStateMutation();

  const handlePlayState = React.useCallback(
    ({ type, partyId, offsetUri, contextUri }: TogglePlayStateOptions) => {
      togglePlayState({
        variables: {
          type,
          partyId,
          contextUri,
          offsetUri,
        },
        refetchQueries: [{ query: PLAYER_QUERY }],
      });
    },
    [],
  );

  const handleActiveDevice = (deviceId: string) => {
    setActiveDevice({
      variables: {
        deviceId,
      },
    });
  };

  return (
    <PlayerContext.Provider
      value={{
        ...player,
        setActiveDevice: handleActiveDevice,
        togglePlayState: handlePlayState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
