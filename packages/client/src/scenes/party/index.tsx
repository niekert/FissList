import * as React from 'react';
import PartyQuery from './PartyQuery';
import styled from 'styled-components';
import { NextIcon, PlayIcon, PauseIcon, PrevIcon } from 'icons';
import Spinner from 'components/Spinner';
import Page from 'components/Page';
import PartyPlaylist from './PartyPlaylist';
import IconButton from 'components/IconButton';
import { Title } from 'components/Typography';
import Player from 'scenes/player';
import { usePlayer } from 'context/player';

const PlayButton = styled(IconButton)`
  border-radius: 50%;
  color: ${props => props.theme.textColors.primaryText};
  border: 3px solid ${props => props.theme.textColors.primaryText};
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }

  svg {
    padding: 12px;
    width: 80px;
    height: 80px;
  }
`;

const PlayerNavigation = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: ${props => props.theme.spacing[3]};
`;

const NavigateButton = styled(PlayButton)`
  margin: 0 ${props => props.theme.spacing[2]};

  svg {
    padding: 12px;
    width: 60px;
    height: 60px;
  }
`;

interface IProps {
  path?: string;
  partyId?: string;
}

export default function Party(props: IProps) {
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

  // This is rediculous lol
  const isPlaying =
    playerContext &&
    playerContext.data &&
    playerContext.data.player &&
    playerContext.data.player.isPlaying;

  return (
    <PartyQuery
      variables={{
        partyId: props.partyId!,
      }}
    >
      {({ data, loading }) => (
        <Page>
          {(!data || !data.party) && <Spinner />}
          {data &&
            data.party && (
              <>
                <Title>{data.party.name}</Title>
                <PlayerNavigation>
                  <NavigateButton
                    onClick={() => {
                      handlePlayState('prev');
                    }}
                  >
                    <PrevIcon />
                  </NavigateButton>
                  <PlayButton
                    onClick={() => {
                      handlePlayState(
                        isPlaying ? 'pause' : 'play',
                        data.party.playlist!.id,
                      );
                    }}
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </PlayButton>
                  <NavigateButton
                    onClick={() => {
                      handlePlayState('next');
                    }}
                  >
                    <NextIcon />
                  </NavigateButton>
                </PlayerNavigation>
                <Player />
                {data &&
                  data.party && (
                    <PartyPlaylist
                      {...data.party.playlist!}
                      isLoading={loading}
                    />
                  )}
              </>
            )}
        </Page>
      )}
    </PartyQuery>
  );
}
