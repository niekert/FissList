import * as React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { TrackInfo } from 'fragments/__generated__/TrackInfo';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: ${props => props.theme.spacing[1]} 0;
  border-bottom: 1px solid
    ${props => transparentize(0.5, props.theme.colors.outline)};
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing[1]};
`;

const Artist = styled.span`
  line-height: 1;
  font-size: 14px;
  color: ${props => props.theme.textColors.secondary};
`;

const PlayButton = styled.button``;

type IProps = TrackInfo & {
  onClick?: (trackId: string) => void;
  isSelected?: boolean;
};

export default function Track({ name, artists }: IProps) {
  const artistNames = artists!.map(artist => artist!.name);

  return (
    <Wrapper>
      <LeftColumn>
        <Title>{name}</Title>
        <Artist>{artistNames}</Artist>
      </LeftColumn>
      <PlayButton>Play a mattie</PlayButton>
    </Wrapper>
  );
}
