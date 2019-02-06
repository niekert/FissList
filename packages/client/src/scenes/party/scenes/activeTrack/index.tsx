import * as React from 'react';
import { usePartyQuery } from '../../queries';
import ActiveTrack from './ActiveTrack';

interface Props {
  partyId: string;
}

function ActiveTrackContainer({ partyId }: Props) {
  const party = usePartyQuery(partyId);

  if (!party.data.party.activeTrack) {
    return null;
  }

  return <ActiveTrack {...party.data.party.activeTrack} />;
}

export default ActiveTrackContainer;
