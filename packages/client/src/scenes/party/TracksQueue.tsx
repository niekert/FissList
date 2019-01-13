import * as React from 'react';
import { useCurrentUser } from 'context/CurrentUser';
import { useQueuedTrackDetails } from './queries';
import PartyTrack from './PartyTrack';

interface QueuedTrack {
  trackId: string;
  userVotes: string[];
}

interface Props {
  queuedTracks: QueuedTrack[];
}

function TracksQueue({ queuedTracks }: Props) {
  const currentUser = useCurrentUser();
  const trackDetails = useQueuedTrackDetails(
    queuedTracks.map(queuedTrack => queuedTrack.trackId),
  );

  if (!trackDetails.data) {
    console.log;
  }

  return trackDetails.data!.queuedTracks.map((track, index) => (
    <PartyTrack
      track={track}
      key={`${track.id}-${index}`}
      isActive={false}
      playTrack={() => {}}
      // isRequested={queuedTracks[index].userVotes.includes(currentUser && currentUser.data.me)}
    />
  ));
}
