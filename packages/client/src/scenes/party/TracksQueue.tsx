import * as React from 'react';
import { useCurrentUser } from 'context/CurrentUser';
import { useChangedTracks } from 'context/ChangedPartyTracksContext';
import { useQueuedTracks } from './queries';
import { usePlayerQuery } from './scenes/player/context/usePlayerQuery';
import PartyTrack from './PartyTrack';
import Spinner from 'components/Spinner';
import posed, { PoseGroup } from 'react-pose';
import styled, { css } from 'styled-components';

interface Props {
  partyId: string;
}

const transition = {
  type: 'spring',
  stiffness: 160,
  damping: 17,
};

const PosedWrapper = posed.div({
  enter: {
    transform: 'translateY(0%);',
    opacity: 1,
    transition,
  },
  exit: {
    opacity: 0,
    transform: 'translateY(-100%);',
    transition,
  },
});

const Draggable = posed.div({
  draggable: 'x',
  dragBounds: { left: '-50%', right: '50%' },
  dragEnd: { transition: 'spring' },
});

const LikeArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 50%;
  pointer-events: none;
  background: rgb(11, 181, 11);
  opacity: 0.5;
`;
const DislikeArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  pointer-events: none;
  width: 50%;
  background: rgb(214, 33, 33);
  opacity: 0.5;
`;

function TracksQueue({ partyId }: Props) {
  const currentUser = useCurrentUser();
  const {
    addedTrackIds,
    nextActiveTrackId,
    markTrackSeen,
  } = useChangedTracks();
  const player = usePlayerQuery();
  const queuedTracks = useQueuedTracks(partyId);

  React.useEffect(
    () => {
      // Refetch the queued tracks if the changed tracks changes
      if (queuedTracks.data && addedTrackIds.length > 0) {
        queuedTracks.refetch();
      }
    },
    [addedTrackIds],
  );

  console.log('tracks', queuedTracks.data!.queuedTracks.length);
  return (
    <>
      <PoseGroup>
        {queuedTracks.data!.queuedTracks.map(queuedTrack => (
          <PosedWrapper
            key={queuedTrack.id}
            css={css`
              position: relative;
            `}
          >
            <LikeArea />
            <DislikeArea />
            <Draggable
              css={css`
                margin: 0 4px;
                background: white;
                position: relative;
                z-index: 1;
              `}
            >
              <PartyTrack
                track={queuedTrack.track}
                isActive={false}
                isRequested={
                  !!currentUser &&
                  queuedTrack.userVotes.includes(currentUser.id)
                }
                voteCount={queuedTrack.userVotes.length}
              />
            </Draggable>
          </PosedWrapper>
        ))}
      </PoseGroup>
      {queuedTracks.loading && <Spinner />}
    </>
  );
}

export default TracksQueue;
