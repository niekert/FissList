import * as React from 'react';
import styled, { css } from 'styled-components';
import { TrackInfo } from 'fragments/__generated__/TrackInfo';
import Track from 'components/Track';
import { transparentize } from 'polished';
import TrackVote from './scenes/trackvote';

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

interface Props {
  track: TrackInfo;
  isActive: boolean;
  isRequested: boolean;
  voteCount: number;
  queuedTrackId: string;
}

function PartyTrack({
  isActive,
  track,
  isRequested,
  voteCount,
  queuedTrackId,
}: Props) {
  return (
    <Wrapper isActive={isActive}>
      <Track {...track} />
      <TrackVote
        isRequested={isRequested}
        voteCount={voteCount}
        queuedTrackId={queuedTrackId}
      />
    </Wrapper>
  );
}

export default PartyTrack;
