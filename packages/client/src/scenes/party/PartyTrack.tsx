import * as React from 'react';
import { useChangedTracks } from 'context/ChangedPartyTracksContext';
import styled, { css } from 'styled-components';
import useVisibility from 'react-intersection-visible-hook';
import { PlaylistInfo_tracks_items } from 'fragments/__generated__/PlaylistInfo';
import Track from 'components/Track';
import { transparentize } from 'polished';
import posed, { PoseGroup } from 'react-pose';

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
  flex-shrink: 0;
  font-weight: 600;
  white-space: nowrap;
  color: ${props => props.theme.colors.success};
  padding-right: ${props => props.theme.spacing[1]};
`;

interface Props extends PlaylistInfo_tracks_items {
  isActive: boolean;
  playTrack: (trackId: string) => void;
}

function PartyTrack({ isActive, addedAt, track, playTrack }: Props) {
  const { changedTrackIds, markTrackSeen } = useChangedTracks();
  const newlyAddedRef = React.useRef(undefined);
  const { isIntersecting } = useVisibility(newlyAddedRef);

  React.useEffect(
    () => {
      if (isIntersecting) {
        setTimeout(() => {
          markTrackSeen(track.id);
        }, 3000);
      }

      return;
    },
    [isIntersecting],
  );

  return (
    <Wrapper
      key={`${addedAt}-${track.id}`}
      isActive={isActive}
      onClick={() => playTrack(track.id)}
    >
      <Track {...track} />
      <PoseGroup animateOnMount={true}>
        {changedTrackIds.includes(track.id) && (
          <NewlyAdded ref={newlyAddedRef} key="newlyAdded">
            New!
          </NewlyAdded>
        )}
      </PoseGroup>
    </Wrapper>
  );
}

export default PartyTrack;
