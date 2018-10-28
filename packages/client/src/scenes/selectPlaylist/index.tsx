import * as React from 'react';
import styled from 'styled-components';
import GetPlaylists from 'queries/GetOwnPlaylists';

interface IProps {
  selectedPlaylistId: string;
  onClick: (playlistId: string) => void;
}

const PlaylistsWrapper = styled.ul`
  max-height: 500px;
  overflow: auto;
`;

const Playlist = styled.li``;

const ThumbNail = styled.figure``;

const Title = styled.span``;

const TrackCount = styled.span``;

function SelectPlaylist({ selectedPlaylistId, onClick }: IProps) {
  return (
    <GetPlaylists>
      {({ data, loading, error }) => {
        if (loading) {
          return 'loading...';
        }

        if (error || !data || !data.getPlaylists) {
          return null;
        }

        if (data && data.getPlaylists) {
          return (
            <PlaylistsWrapper>
              {data.getPlaylists.items.map(playlist => (
                <Playlist
                  key={playlist.id}
                  onClick={() => onClick(playlist.id)}
                >
                  <Title>{playlist.name}</Title>
                  <TrackCount>12 tracks </TrackCount>
                </Playlist>
              ))}
            </PlaylistsWrapper>
          );
        }
      }}
    </GetPlaylists>
  );
}

export default SelectPlaylist;
