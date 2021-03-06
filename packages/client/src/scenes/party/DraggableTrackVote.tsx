import * as React from 'react';
import { spring, transform, value } from 'popmotion';
import { allowDraggableTrackVote } from 'featureFlags';
import styled, { css } from 'styled-components';
import posed from 'react-pose';
import { ThumbUpIcon, ThumbDownIcon } from 'icons';

const { pipe, clamp, interpolate } = transform;

const TRIGGER_DISTANCE = 120;

const Slidable = posed.div({
  draggable: 'x',
  dragBounds: { left: -TRIGGER_DISTANCE, right: TRIGGER_DISTANCE },
  dragEnd: {
    transition: ({ from, to, velocity }) =>
      spring({ from, to, velocity, stiffness: 750, damping: 50 }),
  },
});

const Container = styled.div`
  position: relative;
`;

const PosedLikeArea = posed.div({
  passive: {
    opacity: [
      'x',
      pipe(
        interpolate([0, TRIGGER_DISTANCE], [0, 1]),
        clamp(0.3, 1),
      ),
      true,
    ],
  },
});

const areaStyle = css`
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
  width: 50%;
  pointer-events: none;
  top: 0;
`;

const LikeArea = styled(PosedLikeArea)`
  ${areaStyle}
  left: 0;
  background: rgb(87, 223, 87);
`;

const PosedDislikeArea = posed.div({
  passive: {
    opacity: [
      'x',
      pipe(
        interpolate([0, -TRIGGER_DISTANCE], [0, 1]),
        clamp(0.3, 1),
      ),
      true,
    ],
  },
});

const PosedThumbsUpIcon = posed.div({
  passive: {
    scale: [
      'x',
      pipe(
        interpolate([0, TRIGGER_DISTANCE], [0.6, 1]),
        clamp(0.6, 1),
      ),
      true,
    ],
  },
});

const PosedThumbsDownIcon = posed.div({
  passive: {
    scale: [
      'x',
      pipe(
        interpolate([1, 2, -TRIGGER_DISTANCE], [0.6, 1]),
        clamp(0.6, 1),
      ),
      true,
    ],
  },
});

const DislikeArea = styled(PosedDislikeArea)`
  ${areaStyle}
  right: 0;
  justify-content: flex-end;
  background: rgb(223, 66, 66);
`;

const thumbStyles = css`
  with: 28px;
  height: 28px;
  color: white;
  margin: 0 ${props => props.theme.spacing[3]};
`;

interface Props {
  children: React.ReactNode;
}

function DraggableTrackVote({ children }: Props) {
  if (!allowDraggableTrackVote) {
    // For some reason have to wrap this in a fragment or TS cries..🤷
    return <>{children}</>;
  }

  const x = React.useRef(value(0));

  const valuesMap = { x: x.current };

  return (
    <Container
      css={css`
        position: relative;
      `}
    >
      <LikeArea parentValues={valuesMap}>
        <PosedThumbsUpIcon parentValues={valuesMap}>
          <ThumbUpIcon css={thumbStyles} />
        </PosedThumbsUpIcon>
      </LikeArea>
      <DislikeArea parentValues={valuesMap}>
        <PosedThumbsDownIcon parentValues={valuesMap}>
          <ThumbDownIcon css={thumbStyles} />
        </PosedThumbsDownIcon>
      </DislikeArea>
      <Slidable
        values={valuesMap}
        css={css`
          margin: 0 4px;
          background: white;
          z-index: 1;
          position: relative;
        `}
      >
        {children}
      </Slidable>
    </Container>
  );
}

export default DraggableTrackVote;
