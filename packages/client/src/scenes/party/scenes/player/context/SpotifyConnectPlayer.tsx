import * as React from 'react';
import { usePlayerQuery, PLAYER_QUERY } from './usePlayerQuery';
import { useSetActiveDeviceMutation, usePlaybackMutation } from './mutations';
import { GET_PARTY, usePartyContext } from 'scenes/party';
import { useSpotifyWebSdk } from 'hooks/spotifyWebSdk';
import PlayerContext, { TogglePlayStateOptions } from './PlayerContext';
import { useQueuedTracks } from 'scenes/party/queries';

interface IProps {
  children: React.ReactNode;
}

export function PlayerContainer({ children }: IProps) {
  // need HOOKS for graphql smh
  const player = usePlayerQuery();
  const party = usePartyContext();
  const queuedTracks = useQueuedTracks(party.id);
  const setActiveDevice = useSetActiveDeviceMutation();
  const mutatePlayback = usePlaybackMutation();

  const onPlayerStateChanged = React.useCallback(
    async (state: Spotify.PlaybackState) => {
      if (!state) {
        return;
      }

      console.log('state is', state);

      if (state.context.uri && state.position === 0) {
        // const nextExpectedTrack = party!.playlist.tracks.items[
        //   (party!.activeTrackIndex || 0) + 1
        // ];
        // if (
        //   state.track_window.current_track.id === nextExpectedTrack.track.id
        // ) {
        //   // Correct track is playing
        //   return;
        // }
        // togglePlayState({
        //   variables: {
        //     contextUri: `spotify:track:${nextExpectedTrack.track.id}`,
        //     partyId: party!.id,
        //     type: 'play',
        //   },
        // });
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

  const handleActiveDevice = async (deviceId: string) => {
    await setActiveDevice({
      variables: {
        deviceId,
      },
    });
    player.refetch();
  };

  const startPlayback = React.useCallback(() => {
    console.log('staring');
  }, []);

  const pausePlayback = React.useCallback(() => {
    console.log('pausing');
  }, []);

  const skipTrack = React.useCallback(() => {
    console.log('skipping track');
  }, []);

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
