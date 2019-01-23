import * as React from 'react';
import { useCurrentUser } from 'context/CurrentUser';
import { useChangedTracks } from 'context/ChangedPartyTracksContext';
import { useQueuedTracks } from './queries';
import PartyTrack from './PartyTrack';
import Spinner from 'components/Spinner';

interface Props {
  partyId: string;
}

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
      {queuedTracks.data!.queuedTracks.map((queuedTrack, index) => (
        <PartyTrack
          track={queuedTrack.track}
          key={`${queuedTrack.trackId}-${index}`}
          isActive={false}
          isRequested={
            !!currentUser && queuedTrack.userVotes.includes(currentUser.id)
          }
        />
      ))}
      {queuedTracks.loading && <Spinner />}
    </>
  );
}

export default TracksQueue;
