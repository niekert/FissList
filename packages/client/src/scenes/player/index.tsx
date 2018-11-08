import * as React from 'react';
import styled from 'styled-components';
import { usePlayer } from 'context/player';
import ActiveTrack from './ActiveTrack';
import Devices from './Devices';
import TrackNavigation from './TrackNavigation';

const SecondaryOptions = styled.div`
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

  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    playerContext!.setActiveDevice({
      variables: { deviceId: e.target.value },
    });
  };

  if (!playerContext || !playerContext.data || !playerContext.data.player) {
    return null;
  }

  const { player } = playerContext.data;

  // This is rediculous lol
  const isPlaying = player && player.isPlaying;

  return (
    <>
      {player.item && <ActiveTrack {...player.item} />}
      <SecondaryOptions>
        <TrackNavigation
          // TODO: handle with reducer
          isPlaying={isPlaying}
          onPrev={() => handlePlayState('prev')}
          onNext={() => handlePlayState('next')}
          onPlayPause={() =>
            handlePlayState(isPlaying ? 'pause' : 'play', activeFeedUri)
          }
        />
        <Devices
          activeDevice={player.device}
          isPlaying={player.isPlaying}
          devices={player.devices || []}
          onDeviceChange={handleDeviceChange}
        />
      </SecondaryOptions>
    </>
  );
}
