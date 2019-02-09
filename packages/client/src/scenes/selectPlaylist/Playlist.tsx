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
  display: flex;
  flex-direction: column;
`;

const Thumbnail = styled.img`
  margin-bottom: 0;
  width: 60px;
  height: 60px;
  margin-right: ${props => props.theme.spacing[1]};
  border-radius: 4px;
`;

const Title = styled.span`
  font-weight: 600;
  margin-bottom: 8xp;
`;

const SubLabel = styled.span``;

interface Props {
  trackCount?: number;
  description?: string;
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
  description,
}: Props) {
  return (
    <Wrapper isSelected={isSelected} key={id} onClick={() => onClick(id)}>
      {thumbnail && <Thumbnail src={thumbnail} />}
      <Content>
        <Title>{name}</Title>
        {description !== undefined && <SubLabel>{description}</SubLabel>}
        {trackCount !== undefined && <SubLabel>{trackCount} tracks</SubLabel>}
      </Content>
    </Wrapper>
  );
}
export default Playlist;
