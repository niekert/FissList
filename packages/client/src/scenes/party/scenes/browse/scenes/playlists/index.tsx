import * as React from 'react';
import PlaylistQuery from './PlaylistQuery';
import { Link, Switch, Route, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from 'components/Spinner';
import SelectPlaylist from 'scenes/selectPlaylist';
import { TrackSelectList } from './TrackSelectList';
import { SAVED_MUSIC } from 'app-constants';
import SongLibrary from './SongLibrary';
import { BackIcon } from 'icons';
import { mapPlaylistTracks } from './helpers';

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

const IconLink = styled(Link)`
  color: inherit;
  background-image: none;
  display: flex;
  align-items: center;
  margin-right: ${props => props.theme.spacing[1]};
  text-decoration: none;
`;

const StyledBackIcon = styled(BackIcon)`
  width: 25px;
  height: 25px;
`;

export default function Playlists({ match, history }: RouteComponentProps) {
  return (
    <Switch>
      <Route
        path={`${match.path}/playlist/${SAVED_MUSIC}`}
        render={() => (
          <>
            <SelectedPlaylistName>
              <IconLink replace={true} to={match.url}>
                <StyledBackIcon />
              </IconLink>
              Saved tracks
            </SelectedPlaylistName>
            <SongLibrary />
          </>
        )}
      />
      <Route
        path={`${match.path}/playlist/:playlistId`}
        render={({
          match: playListMatch,
        }: {
          match: { params: { playlistId: string } };
        }) => (
          <PlaylistQuery
            variables={{
              playlistId: playListMatch.params.playlistId,
            }}
          >
            {({ loading, data }) => {
              if (loading || !data) {
                return <StyledSpinner />;
              }

              return (
                <>
                  <SelectedPlaylistName>
                    <IconLink replace={true} to={match.url}>
                      <StyledBackIcon />
                    </IconLink>
                    {data.playlist.name}
                  </SelectedPlaylistName>
                  <TrackSelectList tracks={mapPlaylistTracks(data.playlist)} />
                </>
              );
            }}
          </PlaylistQuery>
        )}
      />
      <Route
        render={() => (
          <SelectPlaylist
            onClick={playlistId =>
              history.push(`${match.url}/playlist/${playlistId}`)
            }
          />
        )}
      />
    </Switch>
  );
}
