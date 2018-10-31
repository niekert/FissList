import * as React from 'react';
import Track from 'components/Track';
import { Title } from 'components/Typography';
import Page from 'components/Page';
import Spinner from 'components/Spinner';
import {
  GetParty_party,
  GetParty_party_playlist,
} from './__generated__/GetParty';

function PartyPlaylist({
  tracks,
  isLoading,
}: GetParty_party_playlist & { isLoading: boolean }) {
  return (
    <>
      {isLoading && <Spinner />}
      {tracks.items.map(track => (
        <Track key={track.track.id} {...track.track} />
      ))}
    </>
  );
}

export default PartyPlaylist;
