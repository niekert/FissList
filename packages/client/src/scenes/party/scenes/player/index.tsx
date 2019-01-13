import * as React from 'react';
import styled from 'styled-components';
import { usePartyContext } from '../../context';
import { usePlayer } from 'context/player';
import { NetworkStatus } from 'apollo-client';
import ActiveTrack from './ActiveTrack';
import Devices from './Devices';
import TrackNavigation from './TrackNavigation';
import NoPlayerFound from './NoPlayerFound';

const PlayerWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  align-self: center;
`;

interface Props {
  partyId: string;
}

export default function Player({ partyId }: Props) {
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

  // if (
  //   ((playerContext!.networkStatus === NetworkStatus.ready &&
  //     !playerContext!.data!.player) ||
  //     playerContext!.networkStatus === NetworkStatus.refetch) &&
  //   !playerContext!.webSdkDeviceId
  // ) {
  //   return (
  //     <NoPlayerFound
  //       isLoading={playerContext!.networkStatus === NetworkStatus.refetch}
  //       onRetry={() => playerContext!.refetch()}
  //     />
  //   );
  // }

  const { player } = playerContext!.data;

  const isPlaying = player ? player.isPlaying : false;

  return (
    <PlayerWrapper>
      {player && player.item && (
        <>
          <ActiveTrack {...player.item} />
          <TrackNavigation
            // TODO: handle with reducer
            isPlaying={isPlaying}
            onPrev={() => handlePlayState('prev')}
            onNext={() => handlePlayState('next')}
            onPlayPause={() => handlePlayState(isPlaying ? 'pause' : 'play')}
          />
        </>
      )}
    </PlayerWrapper>
  );
}
