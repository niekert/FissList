import * as React from 'react';
import { usePlayerQuery, PLAYER_QUERY } from './usePlayerQuery';
import { useSetActiveDeviceMutation, usePlaybackMutation } from './mutations';
import { usePartyContext } from 'scenes/party';
import { useSpotifyWebSdk } from 'hooks/spotifyWebSdk';
import PlayerContext from './PlayerContext';
import { Playback } from 'globalTypes';
import { usePrevState } from 'hooks';

interface IProps {
  children: React.ReactNode;
}

const REFETCH_INTERVAL_MS = 200;

export function PlayerContainer({ children }: IProps) {
  const [
    startedTrackPlayback,
    prevTrackPlayback,
    setStartedTrackPlayback,
  ] = usePrevState(false);

  // need HOOKS for graphql smh
  const player = usePlayerQuery();
  const party = usePartyContext();
  const didConnectRef = React.useRef<boolean>(false);
  const [refetchTimeout, setRefetchTimeout] = React.useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const setActiveDevice = useSetActiveDeviceMutation();
  const mutatePlayback = usePlaybackMutation();

  const onPlayerStateChanged = (state: Spotify.PlaybackState) => {
    if (!state) {
      return;
    }

    if (didConnectRef.current === false) {
      // REfetch the player when we just connected
      player.refetch();
      didConnectRef.current = true;
    }

    if (state.paused === false) {
      setStartedTrackPlayback(true);
    }

    if (state.paused && state.position === 0) {
      setStartedTrackPlayback(false);
    }
  };

  const { deviceId: webSdkDeviceId, script } = useSpotifyWebSdk({
    name: 'PampaPlay',
    getOAuthToken: () =>
      Promise.resolve(localStorage.getItem('accessToken') as string),
    onPlayerStateChanged,
  });

  const handleActiveDevice = async (deviceId: string) => {
    await setActiveDevice({
      variables: {
        deviceId,
      },
    });
  };

  const startPlayback = React.useCallback(
    async () => {
      await mutatePlayback({
        variables: {
          partyId: party.id,
          playback: Playback.PLAY,
        },
      });

      setRefetchTimeout(
        setTimeout(() => player.refetch(), REFETCH_INTERVAL_MS),
      );
    },
    [setRefetchTimeout],
  );

  const pausePlayback = React.useCallback(
    () => {
      mutatePlayback({
        variables: {
          partyId: party.id,
          playback: Playback.PAUSE,
        },
      });

      setRefetchTimeout(
        setTimeout(() => player.refetch(), REFETCH_INTERVAL_MS),
      );
    },
    [setRefetchTimeout],
  );

  React.useEffect(
    () => {
      return () => {
        if (refetchTimeout) {
          return clearTimeout(refetchTimeout);
        }
      };
    },
    [refetchTimeout],
  );

  const skipTrack = React.useCallback(
    async () => {
      await mutatePlayback({
        variables: {
          partyId: party.id,
          playback: Playback.SKIP,
        },
      });

      setRefetchTimeout(
        setTimeout(() => player.refetch(), REFETCH_INTERVAL_MS),
      );
    },
    [setRefetchTimeout],
  );

  React.useEffect(
    () => {
      if (!startedTrackPlayback && prevTrackPlayback) {
        // Skip to the next one
        skipTrack();
      }
    },
    [startedTrackPlayback, prevTrackPlayback],
  );

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
        startPlayback,
        pausePlayback,
        skipTrack,
        webSdkDeviceId,
      }}
    >
      {script}
      {children}
    </PlayerContext.Provider>
  );
}
