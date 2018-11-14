import * as React from 'react';
import PlaylistQuery from './PlaylistQuery';
import styled from 'styled-components';
import Spinner from 'components/Spinner';
import ContextUriContext from 'context/ContextUri';
import Playlist from 'components/Playlist';

import SelectPlaylist from 'scenes/selectPlaylist';

const StyledSpinner = styled(Spinner)`
  margin: 0 auto;
`;

const Center = styled.div`
  display: flex;
`;

export default function Playlists() {
  const [selectedPlaylist, setSelectedPlaylist] = React.useState('');

  return (
    <>
      {!selectedPlaylist && (
        <SelectPlaylist
          onClick={playlistId => setSelectedPlaylist(playlistId)}
        />
      )}
      {selectedPlaylist && (
        <PlaylistQuery
          variables={{
            playlistId: selectedPlaylist,
          }}
        >
          {({ loading, data }) => {
            if (loading || !data) {
              return <StyledSpinner />;
            }

            const { id, name, tracks } = data.playlist;
            return <Playlist id={id} key={id} name={name} tracks={tracks} />;
          }}
        </PlaylistQuery>
      )}
    </>
  );
}
