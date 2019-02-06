import * as React from 'react';
import styled from 'styled-components';
import { NetworkStatus } from 'apollo-client';
import { SAVED_MUSIC } from 'app-constants';
import { PoseGroup } from 'react-pose';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import { useGetPlaylists } from 'queries/useGetPlaylists';
import Playlist from './Playlist';

interface IProps {
  selectedPlaylistId?: string;
  onClick: (playlistId: string) => void;
}

const PlaylistsWrapper = styled.ul`
  margin: 0;
  overflow: auto;
  padding-bottom: ${props => props.theme.spacing[3]};
`;

const Loader = styled(Spinner)`
  margin-top: ${props => props.theme.spacing[1]};
`;

const LoadMoreButton = styled(Button)`
  margin: 0 auto;
`;

function SelectPlaylist({ selectedPlaylistId, onClick }: IProps) {
  const { data, networkStatus, errors, loadNext } = useGetPlaylists();

  if (errors) {
    // TODO: show error
    return null;
  }

  return (
    <>
      {data && data.userPlaylists && (
        <PlaylistsWrapper key="wrapper">
          <Playlist
            key="myMusic"
            id={SAVED_MUSIC}
            isSelected={selectedPlaylistId === SAVED_MUSIC}
            onClick={onClick}
            name="My Music"
            description="All songs from your library"
          />
          <PoseGroup animateOnMount={true}>
            {data.userPlaylists.items.map(playlist => (
              <Playlist
                isSelected={playlist.id === selectedPlaylistId}
                key={playlist.id}
                id={playlist.id}
                onClick={onClick}
                thumbnail={playlist.thumbnail}
                name={playlist.name}
                trackCount={playlist.tracks.total}
              />
            ))}
          </PoseGroup>
          {data.userPlaylists.items.length < data.userPlaylists.total && (
            <LoadMoreButton
              type="button"
              onClick={loadNext}
              isLoading={networkStatus === NetworkStatus.fetchMore}
            >
              Load more
            </LoadMoreButton>
          )}
        </PlaylistsWrapper>
      )}
      {networkStatus === NetworkStatus.loading && <Loader />}
    </>
  );
}

export default SelectPlaylist;
