import * as React from 'react';
import Track from 'components/Track';
import { GetParty_party_playlist } from './__generated__/GetParty';

function PartyPlaylist({
  tracks,
  isLoading,
}: GetParty_party_playlist & { isLoading: boolean }) {
  return (
    <>
      {tracks.items.map(track => (
        <Track key={track.track.id} {...track.track} />
      ))}
    </>
  );
}

export default PartyPlaylist;
