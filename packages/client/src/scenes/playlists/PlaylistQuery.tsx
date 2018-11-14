import * as React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { PlaylistInfo } from 'fragments/Playlist';
import { GetPlaylist, GetPlaylistVariables } from './__generated__/GetPlaylist';

export const GET_PLAYLIST = gql`
  query GetPlaylist($playlistId: String!) {
    playlist(id: $playlistId) {
      ...PlaylistInfo
    }
  }

  ${PlaylistInfo}
`;

export class GetPlaylistQuery extends Query<
  GetPlaylist,
  GetPlaylistVariables
> {}

export type QueryResult = QueryResult<GetPlaylist>;

interface IProps {
  children: (party: QueryResult<GetPlaylist>) => React.ReactNode;
  variables: GetPlaylistVariables;
}

export default function GetPartyQueryComponent({
  children,
  variables,
}: IProps) {
  return (
    <GetPlaylistQuery
      query={GET_PLAYLIST}
      errorPolicy="ignore"
      fetchPolicy="cache-and-network"
      variables={variables}
    >
      {children}
    </GetPlaylistQuery>
  );
}
