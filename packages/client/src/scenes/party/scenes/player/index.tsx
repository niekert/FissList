import * as React from 'react';
import styled from 'styled-components';
import { usePlayer } from './context';
import ActiveTrack from './ActiveTrack';
import TrackNavigation from './TrackNavigation';

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
