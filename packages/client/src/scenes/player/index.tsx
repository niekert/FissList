import * as React from 'react';
import styled from 'styled-components';
import { NextIcon, PlayIcon, PauseIcon, PrevIcon } from 'icons';
import { Card } from 'components/Card';
import IconButton from 'components/IconButton';
import { usePlayer } from 'context/player';
import DevicesSelect from './DevicesSelect';
import ActiveTrack from './ActiveTrack';
import TrackNavigation from './TrackNavigation';

const PlayerWrapper = styled(Card)`
  display: flex;
  position: sticky;
  background: white;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  top: 0;
`;

const Navigation = styled.div`
  display: flex;
`;

export default function Player({ activeFeedUri }) {
  const playerContext = usePlayer();
  const handlePlayState = React.useCallback(
    (type: string, playlistUri?: string) => {
      if (!playerContext) {
        return;
      }

      playerContext.togglePlayState({
        variables: {
          type,
          uri: playlistUri || null,
        },
        optimisticResponse: {
          togglePlayState: {
            __typename: 'PlayStateChange',
            isPlaying: type !== 'pause',
          },
        },
      });
    },
  );

  if (!playerContext || !playerContext.data || !playerContext.data.player) {
    return null;
  }

  const { player } = playerContext.data;

  // This is rediculous lol
  const isPlaying = player && player.isPlaying;

  return (
    <>
      <DevicesSelect devices={player.devices} />
      <PlayerWrapper>
        {player.item && <ActiveTrack {...player.item} />}
        <TrackNavigation
          // TODO: handle with reducer
          isPlaying={isPlaying}
          onPrev={() => handlePlayState('prev')}
          onNext={() => handlePlayState('next')}
          onPlayPause={() =>
            handlePlayState(isPlaying ? 'pause' : 'play', activeFeedUri)
          }
        />
      </PlayerWrapper>
    </>
  );
}
