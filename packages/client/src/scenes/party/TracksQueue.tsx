import * as React from 'react';
import { useCurrentUser } from 'context/CurrentUser';
import { useQueuedTracks } from './queries';
import PartyTrack from './PartyTrack';
import Spinner from 'components/Spinner';

interface Props {
  partyId: string;
}

function TracksQueue({ partyId }: Props) {
  const currentUser = useCurrentUser();
  const queuedTracks = useQueuedTracks(partyId);

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
