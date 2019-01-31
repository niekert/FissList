import * as React from 'react';
import { useCurrentUser } from 'context/CurrentUser';
import { useChangedTracks } from 'context/ChangedPartyTracksContext';
import { useQueuedTracks } from './queries';
import { usePlayerQuery } from './scenes/player/context/usePlayerQuery';
import PartyTrack from './PartyTrack';
import Spinner from 'components/Spinner';
import posed, { PoseGroup } from 'react-pose';

interface Props {
  partyId: string;
}

const PosedWrapper = posed.div({
  enter: {
    transform: 'translateY(0%);',
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transform: 'translateY(-100%);',
  },
});

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
          <PosedWrapper key={queuedTrack.id}>
            <PartyTrack
              track={queuedTrack.track}
              isActive={false}
              isRequested={
                !!currentUser && queuedTrack.userVotes.includes(currentUser.id)
              }
              voteCount={queuedTrack.userVotes.length}
            />
          </PosedWrapper>
        ))}
      </PoseGroup>
      {queuedTracks.loading && <Spinner />}
    </>
  );
}

export default TracksQueue;
