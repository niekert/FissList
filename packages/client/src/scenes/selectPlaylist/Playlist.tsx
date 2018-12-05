import * as React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div<{ isSelected: boolean }>`
  max-width: 100%;
  padding: 8px 0;
  display: flex;
  cursor: pointer;
  padding: ${props => `${props.theme.spacing[1]} ${props.theme.spacing[2]}`};
  align-items: center;
  border-radius: 4px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }

  ${props =>
    props.isSelected &&
    css`
      background: ${props.theme.colors.activeBackground};
    `};
`;

const Content = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
`;

const Thumbnail = styled.img`
  margin-bottom: 0;
  width: 60px;
  height: 60px;
  border-radius: 4px;
`;

const Title = styled.span`
  font-weight: 600;
  margin-bottom: 8xp;
`;

const TrackCount = styled.span``;

interface Props {
  trackCount: number;
  name: string;
  id: string;
  isSelected: boolean;
  thumbnail?: string | null;
  onClick: (id: string) => void;
}

function Playlist({
  trackCount,
  name,
  id,
  onClick,
  thumbnail,
  isSelected,
}: Props) {
  return (
    <Wrapper isSelected={isSelected} key={id} onClick={() => onClick(id)}>
      {thumbnail && <Thumbnail src={thumbnail} />}
      <Content>
        <Title>{name}</Title>
        <TrackCount>{trackCount} tracks</TrackCount>
      </Content>
    </Wrapper>
  );
}
export default Playlist;
