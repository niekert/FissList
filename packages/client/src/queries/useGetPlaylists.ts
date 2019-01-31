import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import {
  GetPlaylists,
  GetPlaylistsVariables,
} from './__generated__/GetPlaylists';

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

export function useGetPlaylists() {
  const result = useQuery<GetPlaylists, GetPlaylistsVariables>(
    GET_OWN_PLAYLISTS,
    { notifyOnNetworkStatusChange: true, suspend: false },
  );

  return {
    ...result,
    loadNext() {
      const { data, fetchMore } = result;

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
  };
}
