import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { TrackInfo } from 'fragments';
import { Search, SearchVariables } from './__generated__/Search';

export const SEARCH_RESULTS_QUERY = gql`
  query Search($query: String!) {
    search(query: $query) {
      tracks {
        items {
          ...TrackInfo
        }
        offset
        total
        limit
        next
      }
    }
  }

  ${TrackInfo}
`;

export function useSearchResults(query: string) {
  return useQuery<Search, SearchVariables>(SEARCH_RESULTS_QUERY, {
    variables: {
      query,
    },
  });
}
