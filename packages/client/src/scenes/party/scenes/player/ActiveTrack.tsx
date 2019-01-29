import * as React from 'react';
import styled from 'styled-components';
import { TrackInfo } from 'fragments/__generated__/TrackInfo';
import posed, { PoseGroup } from 'react-pose';

const PosedWrapper = posed.div({
  exit: {
    transform: 'translateX(50%)',
    opacity: 0,
  },
  preEnter: {
    transform: 'translateX(-100%)',
    opacity: 0,
  },
  enter: {
    transform: 'translateX(0%)',
    opacity: 1,
    delay: 300,
  },
});
const Wrapper = styled(PosedWrapper)`
  display: flex;
  flex: 1;
  will-change: transform;
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
  max-width: 100%;
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

function ActiveTrack({ name, artists, images, id }: TrackInfo) {
  return (
    <PoseGroup
      preEnterPose="preEnter"
      animateOnMount={false}
      withParent={false}
      flipMove={false}
    >
      <Wrapper key={id}>
        {/* todo get nicer image */}
        {images && <Image src={images[0].url} />}
        <ContentWrapper>
          <Title>{name}</Title>
          <Artists>{artists.map(artist => artist.name).join(', ')}</Artists>
        </ContentWrapper>
      </Wrapper>
    </PoseGroup>
  );
}

export default ActiveTrack;
