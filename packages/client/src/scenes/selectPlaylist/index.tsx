import * as React from 'react';
import styled, { css } from 'styled-components';
import { Img } from 'the-platform';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import { transparentize } from 'polished';
import GetPlaylists from 'queries/GetOwnPlaylists';

interface IProps {
  selectedPlaylistId: string;
  onClick: (playlistId: string) => void;
}

const PlaylistsWrapper = styled.ul`
  margin: 0;
  overflow: auto;
`;

const Playlist = styled.li<{ isSelected: boolean }>`
  max-width: 100%;
  padding: 8px 0;
  display: flex;
  cursor: pointer;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }

  ${props =>
    props.isSelected &&
    css`
      background: ${transparentize(0.8, props.theme.colors.cta)};
    `};
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

const Loader = styled(Spinner)`
  margin-top: ${props => props.theme.spacing[1]};
  align-self: center;
`;

const LoadMoreButton = styled(Button)`
  margin: 0 auto;
`;

const TrackCount = styled.span``;

const getThumbnail = images => {};

function SelectPlaylist({ selectedPlaylistId, onClick }: IProps) {
  return (
    <GetPlaylists>
      {({ data, loading, error, loadNext }) => {
        if (error) {
          // TODO: show error
          return null;
        }

        return (
          <>
            {data &&
              data.getPlaylists && (
                <PlaylistsWrapper>
                  {data.getPlaylists.items.map(playlist => (
                    <Playlist
                      isSelected={playlist.id === selectedPlaylistId}
                      key={playlist.id}
                      onClick={() => onClick(playlist.id)}
                    >
                      {playlist.thumbnail && (
                        <Thumbnail src={playlist.thumbnail || ''} />
                      )}
                      <Content>
                        <Title>{playlist.name}</Title>
                        <TrackCount>{playlist.tracks.total} tracks</TrackCount>
                      </Content>
                    </Playlist>
                  ))}
                  {!loading &&
                    data.getPlaylists.items.length <
                      data.getPlaylists.total && (
                      <LoadMoreButton onClick={loadNext}>
                        Load more
                      </LoadMoreButton>
                    )}
                </PlaylistsWrapper>
              )}
            {loading && <Loader />}
          </>
        );
      }}
    </GetPlaylists>
  );
}

export default SelectPlaylist;
