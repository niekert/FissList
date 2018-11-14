import * as React from 'react';
import PlaylistQuery from './PlaylistQuery';
import styled from 'styled-components';
import Spinner from 'components/Spinner';
import Playlist from 'components/Playlist';

import SelectPlaylist from 'scenes/selectPlaylist';

const StyledSpinner = styled(Spinner)`
  margin: 0 auto;
`;

const SelectedPlaylistName = styled.div`
  font-weight: 600;
  position: sticky;
  top: 0;
  display: flex;
  background: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing[2]};
  border-bottom: 1px solid ${props => props.theme.colors.outline};
  z-index: 1;
  font-size: 22px;
`;

const ScrollablePlaylist = styled.div`
  flex: 1;
  overflow: auto;
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
            return (
              <>
                <SelectedPlaylistName>{name}</SelectedPlaylistName>
                <ScrollablePlaylist>
                  <Playlist id={id} key={id} name={name} tracks={tracks} />
                </ScrollablePlaylist>
              </>
            );
          }}
        </PlaylistQuery>
      )}
    </>
  );
}
