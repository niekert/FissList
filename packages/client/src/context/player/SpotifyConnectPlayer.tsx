import * as React from 'react';
import { usePlayerQuery, PLAYER_QUERY } from './usePlayerQuery';
import {
  useSetActiveDeviceMutation,
  useSetTogglePlayStateMutation,
} from './mutations';
import { GET_PARTY, usePartyContext } from 'scenes/party';
import { useSpotifyWebSdk } from 'hooks/spotifyWebSdk';
import PlayerContext, { TogglePlayStateOptions } from './PlayerContext';
import { Context } from 'context/ChangedPartyTracksContext';

interface IProps {
  children: React.ReactNode;
}

export function PlayerContainer({ children }: IProps) {
  // need HOOKS for graphql smh
  const player = usePlayerQuery();
  const party = usePartyContext();
  const setActiveDevice = useSetActiveDeviceMutation();
  const togglePlayState = useSetTogglePlayStateMutation();

  if (player.data.player && player.data.player.item) {
    console.log('active item', player.data.player.item);
  }

  const onPlayerStateChanged = React.useCallback(
    async (state: Spotify.PlaybackState) => {
      if (!state) {
        return;
      }

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

  const handlePlayState = React.useCallback(
    ({ type, offsetUri, contextUri }: TogglePlayStateOptions) => {
      togglePlayState({
        variables: {
          type,
          partyId: party.id,
          contextUri,
          offsetUri,
        },
        refetchQueries: [
          { query: PLAYER_QUERY },
          { query: GET_PARTY, variables: { partyId: party.id } },
        ],
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
