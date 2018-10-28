import * as React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { GetPlaylists } from './__generated__/GetPlaylists';

export const GET_OWN_PLAYLISTS = gql`
  query GetPlaylists {
    getPlaylists {
      href
      items {
        id
        href
        name
        thumbnail
        tracks {
          total
        }
      }
    }
  }
`;

export class GetPlaylistsQuery extends Query<GetPlaylists> {}
export type QueryResult = QueryResult<GetPlaylists>;

interface IProps {
  children: (result: QueryResult<GetPlaylists>) => React.ReactNode;
}

export default function GetPlaylists({ children }: IProps) {
  return (
    <GetPlaylistsQuery query={GET_OWN_PLAYLISTS} fetchPolicy="network-only">
      {children}
    </GetPlaylistsQuery>
  );
}
