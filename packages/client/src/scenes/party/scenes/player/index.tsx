import * as React from 'react';
import styled, { css } from 'styled-components';
import { usePrevState } from 'hooks';
import { useSpotifyWebSdk } from 'hooks/spotifyWebSdk';
import { usePlayer } from './context';
import ActiveTrackContainer from '../activeTrack';
import TrackNavigation from './TrackNavigation';
import TrackProgressLine from './TrackProgressLine';
import posed, { PoseGroup } from 'react-pose';

const PosedWrapper = posed.div({
  enter: {
    height: 'auto',
  },
  exit: {
    height: '0px',
  },
});

const PlayerWrapper = styled(PosedWrapper)`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-self: center;
`;

interface Props {
  partyId: string;
}

export default function Player({ partyId }: Props) {
  const [playbackState, setPlaybackState] = React.useState<
    Spotify.PlaybackState | undefined
  >(undefined);
  const [
    startedTrackPlayback,
    prevTrackPlayback,
    setStartedTrackPlayback,
  ] = usePrevState(false);
  const playerContext = usePlayer();
  const didConnectRef = React.useRef<boolean>(false);
  const { deviceId: webSdkDeviceId, isReady } = useSpotifyWebSdk({
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

      setPlaybackState(state);
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
      console.log('webSdkDevice', webSdkDeviceId, isReady);

      if (webSdkDeviceId && isReady) {
        playerContext!.setActiveDevice(webSdkDeviceId);

        const timeout = setTimeout(() => playerContext!.refetch(), 500);
        return () => clearTimeout(timeout);
      }
      return;
    },
    [webSdkDeviceId, isReady],
  );

  const { player } = playerContext!.data;

  const isPlaying = player ? player.isPlaying : false;

  return (
    <>
      <PoseGroup animateOnMount={true}>
        <PlayerWrapper key="playerwrapper">
          {playbackState && (
            <TrackProgressLine
              duration={playbackState.duration}
              position={playbackState.position}
              paused={playbackState.paused}
            />
          )}
          <div
            css={css`
              display: flex;
              overflow: hidden;
              padding: ${props => props.theme.spacing[1]} 0
                ${props => props.theme.spacing[1]}
                ${props => props.theme.spacing[2]};
            `}
          >
            <ActiveTrackContainer partyId={partyId} />

            <TrackNavigation
              isPlaying={isPlaying}
              onNext={playerContext!.skipTrack}
              onPlayPause={
                isPlaying
                  ? playerContext!.pausePlayback
                  : playerContext!.startPlayback
              }
            />
          </div>
        </PlayerWrapper>
      </PoseGroup>
    </>
  );
}
