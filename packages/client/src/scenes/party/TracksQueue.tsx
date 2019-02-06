import * as React from 'react';
import { useCurrentUser } from 'context/CurrentUser';
import { useChangedTracks } from 'scenes/party/context/ChangedPartyTracksContext';
import { useQueuedTracks } from './queries';
import PartyTrack from './PartyTrack';
import Spinner from 'components/Spinner';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components';
import DraggableTrackVote from './DraggableTrackVote';

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

function TracksQueue({ partyId }: Props) {
  const currentUser = useCurrentUser();
  const { addedTrackIds } = useChangedTracks();
  const queuedTracks = useQueuedTracks(partyId);

  React.useEffect(() => {
    // Refetch the queued tracks if the changed tracks changes
    if (queuedTracks.data && addedTrackIds.length > 0) {
      queuedTracks.refetch();
    }
  }, [addedTrackIds]);

  return (
    <>
      <PoseGroup>
        {queuedTracks.data!.queuedTracks.map(queuedTrack => (
          <PosedWrapper key={queuedTrack.id}>
            <DraggableTrackVote>
              <PartyTrack
                queuedTrackId={queuedTrack.id}
                track={queuedTrack.track}
                isActive={false}
                isRequested={
                  !!currentUser &&
                  queuedTrack.userVotes.includes(currentUser.id)
                }
                voteCount={queuedTrack.userVotes.length}
              />
            </DraggableTrackVote>
          </PosedWrapper>
        ))}
      </PoseGroup>
      {queuedTracks.loading && <Spinner />}
    </>
  );
}

export default TracksQueue;
