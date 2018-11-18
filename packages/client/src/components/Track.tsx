import * as React from 'react';
import { usePlayer } from 'context/player';
import ContextUriContext from 'context/ContextUri';
import { getCurrentTrackId } from 'selectors/player';
import styled from 'styled-components';
import { TrackInfo } from 'fragments/__generated__/TrackInfo';

const Wrapper = styled.div<{ isNowPlaying?: boolean }>`
  display: flex;
  width: 100%;
  height: 70px;
  justify-content: space-between;
  padding: ${props => `${props.theme.spacing[1]} ${props.theme.spacing[2]}`};
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.span`
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing[1]};
`;

const Artist = styled.span`
  line-height: 1;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  color: ${props => props.theme.textColors.secondary};
`;

const PlayButton = styled.button`
  flex-shrink: 0;
`;

type IProps = TrackInfo & {
  onClick?: (trackId: string) => void;
};

function Track({ name, id, artists, onClick, ...props }: IProps) {
  const player = usePlayer();
  const contextUri = React.useContext(ContextUriContext);
  const artistNames = artists!.map(artist => artist!.name).join(', ');

  const onTrackClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const playTrack = () => {
    player!.togglePlayState({
      variables: {
        type: 'play',
        contextUri,
        offsetUri: `spotify:track:${id}`,
      },
    });
  };

  const activeTrackID = getCurrentTrackId(player!);
  const isNowPlaying = activeTrackID === id;

  return (
    <Wrapper isNowPlaying={isNowPlaying} onClick={onTrackClick} {...props}>
      <LeftColumn>
        <Title>{name}</Title>
        <Artist>{artistNames}</Artist>
      </LeftColumn>
      <PlayButton onClick={playTrack}>Play</PlayButton>
    </Wrapper>
  );
}

export default React.memo(Track);
