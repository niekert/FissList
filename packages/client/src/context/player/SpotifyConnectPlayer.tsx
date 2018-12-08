import * as React from 'react';
import { usePlayerQuery, PLAYER_QUERY } from './usePlayerQuery';
import {
  useSetActiveDeviceMutation,
  useSetTogglePlayStateMutation,
} from './mutations';
import { useSpotifyWebSdk } from 'hooks/spotifyWebSdk';
import PlayerContext, { TogglePlayStateOptions } from './PlayerContext';
import { Context } from 'context/ChangedPartyTracksContext';

interface IProps {
  children: React.ReactNode;
}

export function PlayerContainer({ children }: IProps) {
  // need HOOKS for graphql smh
  const player = usePlayerQuery();
  const onPlayerStateChanged = React.useCallback(
    (state: Spotify.PlaybackState) => {
      if (!state) {
        return;
      }

      if (state.context.uri) {
        console.log('new uri', state.track_window.current_track.id);
      }
    },
    [],
  );

  const { deviceId: webSdkDeviceId, script } = useSpotifyWebSdk({
    name: 'PampaPlay',

    getOAuthToken: () =>
      Promise.resolve(localStorage.getItem('accessToken') as string),
    onPlayerStateChanged,
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

  const handleActiveDevice = async (deviceId: string) => {
    await setActiveDevice({
      variables: {
        deviceId,
      },
    });
    player.refetch();
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
      {script}
      {children}
    </PlayerContext.Provider>
  );
}
