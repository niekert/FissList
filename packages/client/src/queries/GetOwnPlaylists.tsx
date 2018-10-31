import * as React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { GetPlaylists } from './__generated__/GetPlaylists';

export const GET_OWN_PLAYLISTS = gql`
  query GetPlaylists($offset: Int) {
    userPlaylists(offset: $offset) {
      href
      offset
      total
      limit
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
  children: (
    result: QueryResult<GetPlaylists> & { loadNext: () => void },
  ) => React.ReactNode;
}

export default function GetPlaylists({ children }: IProps) {
  return (
    <GetPlaylistsQuery
      query={GET_OWN_PLAYLISTS}
      notifyOnNetworkStatusChange={true}
    >
      {queryResult =>
        children({
          ...queryResult,

          loadNext: () => {
            const { data, fetchMore } = queryResult;

            if (!data || !data.userPlaylists) {
              return;
            }

            fetchMore({
              variables: {
                offset: data.userPlaylists.offset + data.userPlaylists.limit,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                // TODO: how to deal with all the exlamation mark hacks here?
                return {
                  ...prev,
                  userPlaylists: {
                    ...fetchMoreResult!.userPlaylists!,
                    items: [
                      ...prev.userPlaylists!.items,
                      ...fetchMoreResult!.userPlaylists!.items,
                    ],
                  },
                };
              },
            });
          },
        })
      }
    </GetPlaylistsQuery>
  );
}
