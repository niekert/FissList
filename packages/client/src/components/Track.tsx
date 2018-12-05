import * as React from 'react';
import { usePlayer } from 'context/player';
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
  justify-content: center;
  overflow: hidden;
`;

const Title = styled.span`
  font-weight: 600;
`;

const Artist = styled.span`
  line-height: 1;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  color: ${props => props.theme.textColors.secondary};
`;

type IProps = TrackInfo & {
  onClick?: (trackId: string) => void;
};

function Track({ name, id, artists, onClick, ...props }: IProps) {
  const player = usePlayer();

  const artistNames = artists!.map(artist => artist!.name).join(', ');

  const onTrackClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const activeTrackID = getCurrentTrackId(player!);
  const isNowPlaying = activeTrackID === id;

  return (
    <Wrapper isNowPlaying={isNowPlaying} onClick={onTrackClick} {...props}>
      <LeftColumn>
        <Title>{name}</Title>
        <Artist>{artistNames}</Artist>
      </LeftColumn>
    </Wrapper>
  );
}

export default React.memo(Track);
