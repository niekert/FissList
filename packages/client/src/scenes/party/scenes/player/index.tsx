import * as React from 'react';
import styled from 'styled-components';
import { usePrevState } from 'hooks';
import { useSpotifyWebSdk } from 'hooks/spotifyWebSdk';
import { usePlayer } from './context';
import ActiveTrack from './ActiveTrack';
import TrackNavigation from './TrackNavigation';

const PlayerWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  align-self: center;
`;

export default function Player() {
  const [
    startedTrackPlayback,
    prevTrackPlayback,
    setStartedTrackPlayback,
  ] = usePrevState(false);
  const playerContext = usePlayer();
  const didConnectRef = React.useRef<boolean>(false);
  const { deviceId: webSdkDeviceId, script } = useSpotifyWebSdk({
    name: 'PampaPlay',
    getOAuthToken: () =>
      Promise.resolve(localStorage.getItem('accessToken') as string),
    onPlayerStateChanged(state: Spotify.PlaybackState) {
      if (!state) {
        return;
      }

      if (didConnectRef.current === false) {
        // REfetch the player when we just connected
        playerContext!.refetch();
        didConnectRef.current = true;
      }

      if (state.paused === false) {
        setStartedTrackPlayback(true);
      }

      if (state.paused && state.position === 0) {
        setStartedTrackPlayback(false);
      }
    },
  });
  React.useEffect(
    () => {
      if (!startedTrackPlayback && prevTrackPlayback) {
        // Skip to the next one
        playerContext!.skipTrack();
      }
    },
    [startedTrackPlayback, prevTrackPlayback],
  );

  React.useEffect(
    () => {
      // Always make the web sdk device leading
      if (webSdkDeviceId) {
        playerContext!.setActiveDevice(webSdkDeviceId);
      }
    },
    [webSdkDeviceId],
  );

  const { player } = playerContext!.data;

  const isPlaying = player ? player.isPlaying : false;

  return (
    <PlayerWrapper>
      {script}
      {player && player.item && (
        <>
          <ActiveTrack {...player.item} />
          <TrackNavigation
            // TODO: handle with reducer
            isPlaying={isPlaying}
            onNext={playerContext!.skipTrack}
            onPlayPause={
              isPlaying
                ? playerContext!.pausePlayback
                : playerContext!.startPlayback
            }
          />
        </>
      )}
    </PlayerWrapper>
  );
}
