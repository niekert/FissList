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
  const changedTracks = useChangedTracks();
  const queuedTracks = useQueuedTracks(partyId);

  React.useEffect(
    () => {
      // Refetch the queued tracks if the changed tracks changes
      if (queuedTracks.data && changedTracks.changedTrackIds.length > 0) {
        queuedTracks.refetch();
      }
    },
    [changedTracks.changedTrackIds],
  );

  return (
    <>
      {queuedTracks.data!.queuedTracks.map((queuedTrack, index) => (
        <PartyTrack
          track={queuedTrack.track}
          key={`${queuedTrack.trackId}-${index}`}
          isActive={false}
          playTrack={() => {}}
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
