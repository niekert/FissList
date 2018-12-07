import * as React from 'react';
import styled from 'styled-components';
import { usePlayer } from 'context/player';
import { NetworkStatus } from 'apollo-client';
import ActiveTrack from './ActiveTrack';
import Devices from './Devices';
import TrackNavigation from './TrackNavigation';
import NoPlayerFound from './NoPlayerFound';

const SecondaryOptions = styled.div`
  display: flex;
  align-self: center;
`;

interface Props {
  partyId: string;
  activeFeedUri: string;
}

export default function Player({ activeFeedUri, partyId }: Props) {
  const playerContext = usePlayer();

  const handlePlayState = React.useCallback(
    (type: string, uris?: string[], playlistUri?: string) => {
      if (!playerContext) {
        return;
      }

      playerContext.togglePlayState({
        type,
        uris,
        playlistUri,
        partyId,
      });
    },
    [],
  );

  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      playerContext!.setActiveDevice(e.target.value);
    }
  };

  if (
    ((playerContext!.networkStatus === NetworkStatus.ready &&
      !playerContext!.data!.player) ||
      playerContext!.networkStatus === NetworkStatus.refetch) &&
    !playerContext!.webSdkDeviceId
  ) {
    return (
      <NoPlayerFound
        isLoading={playerContext!.networkStatus === NetworkStatus.refetch}
        onRetry={() => playerContext!.refetch()}
      />
    );
  }

  const { player } = playerContext!.data;

  const isPlaying = player ? player.isPlaying : false;

  return (
    <>
      {player && player.item && <ActiveTrack {...player.item} />}
      <SecondaryOptions>
        <TrackNavigation
          // TODO: handle with reducer
          isPlaying={isPlaying}
          onPrev={() => handlePlayState('prev')}
          onNext={() => handlePlayState('next')}
          onPlayPause={() => handlePlayState(isPlaying ? 'pause' : 'play')}
        />
        <Devices
          activeDevice={player ? player.device : null}
          isPlaying={isPlaying}
          devices={(player && player.devices) || []}
          webSdkDeviceId={playerContext!.webSdkDeviceId}
          onDeviceChange={handleDeviceChange}
        />
      </SecondaryOptions>
    </>
  );
}
