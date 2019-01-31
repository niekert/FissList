import * as React from 'react';
import styled, { css } from 'styled-components';
import { TrackInfo } from 'fragments/__generated__/TrackInfo';
import posed, { PoseGroup } from 'react-pose';

const transition = {
  duration: 300,
};
const PosedWrapper = posed.div({
  exit: {
    transform: 'translateY(-100%)',
    opacity: 0,
    delay: 25,
    position: 'absolute',
    transition,
  },
  preEnter: {
    transform: 'translateY(100%)',
    opacity: 0,
  },
  enter: {
    transform: 'translateY(0%)',
    opacity: 1,
    delay: 100,
    transition,
  },
});
const Wrapper = styled(PosedWrapper)`
  display: flex;
  flex: 1;
  will-change: transform;
  overflow: hidden;
  flex: 1 0;
  position: absolute;
  max-width: 100%;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
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
    <div
      css={css`
        height: 70px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 ${props => props.theme.spacing[2]}px;
        position: relative;
      `}
    >
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
    </div>
  );
}

export default ActiveTrack;
