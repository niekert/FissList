import * as React from 'react';
import { usePlayerQuery, PLAYER_QUERY } from './usePlayerQuery';
import {
  useSetActiveDeviceMutation,
  useSetTogglePlayStateMutation,
} from './mutations';
import { useSpotifyWebSdk } from 'hooks/spotifyWebSdk';
import PlayerContext, { TogglePlayStateOptions } from './PlayerContext';

interface IProps {
  children: React.ReactNode;
}

export function PlayerContainer({ children }: IProps) {
  // need HOOKS for graphql smh
  const player = usePlayerQuery();
  const { script: webSdkScript, deviceId: webSdkDeviceId } = useSpotifyWebSdk({
    name: 'PampaPlay',
    getOAuthToken: () => localStorage.getItem('accessToken') as string,
  });

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

  React.useEffect(
    () => {
      // Always make the web sdk device leading
      if (webSdkDeviceId) {
        handleActiveDevice(webSdkDeviceId);
      }
    },
    [webSdkDeviceId],
  );

  return (
    <PlayerContext.Provider
      value={{
        ...player,
        setActiveDevice: handleActiveDevice,
        togglePlayState: handlePlayState,
        webSdkDeviceId,
      }}
    >
      {webSdkScript}
      {children}
    </PlayerContext.Provider>
  );
}
