import * as React from 'react';
import { useCurrentUser } from 'context/CurrentUser';
import { useChangedTracks } from 'context/ChangedPartyTracksContext';
import { useQueuedTracks } from './queries';
import PartyTrack from './PartyTrack';
import Spinner from 'components/Spinner';
import posed, { PoseGroup } from 'react-pose';

interface Props {
  partyId: string;
}

const PosedWrapper = posed.div({
  enter: {
    transform: 'translate3d(0, 0%);',
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transform: 'translate3d(0, -100%);',
  },
});

function TracksQueue({ partyId }: Props) {
  const currentUser = useCurrentUser();
  const { addedTrackIds, deletedTrackIds } = useChangedTracks();
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

  return (
    <>
      <PoseGroup>
        {queuedTracks.data!.queuedTracks.map((queuedTrack, index) => (
          <PosedWrapper key={queuedTrack.id}>
            <PartyTrack
              track={queuedTrack.track}
              isActive={false}
              isRequested={
                !!currentUser && queuedTrack.userVotes.includes(currentUser.id)
              }
            />
          </PosedWrapper>
        ))}
      </PoseGroup>
      {queuedTracks.loading && <Spinner />}
    </>
  );
}

export default TracksQueue;
