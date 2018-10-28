import * as React from 'react';
import styled from 'styled-components';
import GetPlaylists from 'queries/GetOwnPlaylists';

interface IProps {
  selectedPlaylistId: string;
  onClick: (playlistId: string) => void;
}

const PlaylistsWrapper = styled.ul`
  margin: 0;
  overflow: auto;
`;

const Playlist = styled.li`
  max-width: 100%;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
`;

const Thumbnail = styled.img`
  margin-bottom: 0;
  width: 60px;
  height: 60px;
  border-radius: 4px;
`;

const Title = styled.span`
  font-weight: 600;
  margin-bottom: 8xp;
`;

const TrackCount = styled.span``;

const getThumbnail = images => {};

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
                  <Thumbnail src={playlist.thumbnail || ''} />
                  <Content>
                    <Title>{playlist.name}</Title>
                    <TrackCount>{playlist.tracks.total} tracks</TrackCount>
                  </Content>
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
