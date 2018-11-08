import * as React from 'react';
import styled from 'styled-components';
import { TrackInfo } from 'fragments/__generated__/TrackInfo';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  /* justify-content: center; */
  overflow: hidden;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  margin-right: ${props => props.theme.spacing[2]};
  margin-bottom: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Artists = styled.span`
  color: ${props => props.theme.textColors.secondary};
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;

  text-overflow: ellipsis;
`;

function ActiveTrack({ name, artists, images }: TrackInfo) {
  return (
    <Wrapper>
      {/* todo get nicer image */}
      {images && <Image src={images[0].url} />}
      <ContentWrapper>
        <Title>{name}</Title>
        <Artists>{artists.map(artist => artist.name).join(', ')}</Artists>
      </ContentWrapper>
    </Wrapper>
  );
}

export default ActiveTrack;
