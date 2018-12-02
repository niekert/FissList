import * as React from 'react';
import styled, { css } from 'styled-components';
import { PoseGroup } from 'react-pose';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import GetPlaylists from 'queries/GetOwnPlaylists';

interface IProps {
  selectedPlaylistId?: string;
  onClick: (playlistId: string) => void;
}

const PlaylistsWrapper = styled.ul`
  margin: 0;
  overflow: auto;
  padding-bottom: ${props => props.theme.spacing[3]};
`;

const Playlist = styled.div<{ isSelected: boolean }>`
  max-width: 100%;
  padding: 8px 0;
  display: flex;
  cursor: pointer;
  padding: ${props => `${props.theme.spacing[1]} ${props.theme.spacing[2]}`};
  align-items: center;
  border-radius: 4px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }

  ${props =>
    props.isSelected &&
    css`
      background: ${props.theme.colors.activeBackground};
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
`;

const LoadMoreButton = styled(Button)`
  margin: 0 auto;
`;

const TrackCount = styled.span``;

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
            {data && data.userPlaylists && (
              <PlaylistsWrapper key="wrapper">
                <PoseGroup animateOnMount={true}>
                  {data.userPlaylists.items.map((playlist, i) => (
                    <Playlist
                      isSelected={playlist.id === selectedPlaylistId}
                      i={i - data.userPlaylists!.offset}
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
                </PoseGroup>
                {!loading &&
                  data.userPlaylists.items.length <
                    data.userPlaylists.total && (
                    <LoadMoreButton type="button" onClick={loadNext}>
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
