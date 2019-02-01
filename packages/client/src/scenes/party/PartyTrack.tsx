import * as React from 'react';
import { useChangedTracks } from 'context/ChangedPartyTracksContext';
import styled, { css } from 'styled-components';
import useVisibility from 'react-intersection-visible-hook';
import { TrackInfo } from 'fragments/__generated__/TrackInfo';
import Track from 'components/Track';
import { transparentize } from 'polished';
import posed, { PoseGroup } from 'react-pose';
import TrackVote from './TrackVote';

const Wrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  border-bottom: 1px solid
    ${props => transparentize(0.5, props.theme.colors.outline)};

  ${props =>
    props.isActive &&
    css`
      background: ${props.theme.colors.activeBackground};
    `}
`;

const PosedNewLabel = posed.div({
  enter: {
    transform: 'translateX(0%)',
    transition: {
      delay: 1000,
      duration: 150,
    },
  },
  exit: {
    transform: 'translateX(120%)',
    transition: {
      duration: 150,
    },
  },
});

const NewlyAdded = styled(PosedNewLabel)`
  position: absolute;
  top: 0;
  height: 100%;
  right: 0;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  font-weight: 600;
  white-space: nowrap;
  color: ${props => props.theme.colors.success};
  padding-right: ${props => props.theme.spacing[1]};
`;

interface Props {
  track: TrackInfo;
  isActive: boolean;
  isRequested: boolean;
  voteCount: number;
}

function PartyTrack({ isActive, track, isRequested, voteCount }: Props) {
  return (
    <Wrapper isActive={isActive}>
      <Track {...track} />
      <TrackVote isRequested={isRequested} voteCount={voteCount} />
    </Wrapper>
  );
}

export default PartyTrack;
