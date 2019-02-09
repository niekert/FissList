import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { GetMe } from './__generated__/GetMe';

export const GET_ME = gql`
  query GetMe {
    me {
      user {
        id
        displayName
        email
        href
        images {
          url
        }
      }
      parties {
        id
        name
        updatedAt
        userCount
      }
    }
  }
`;

export function useGetMe() {
  return useQuery<GetMe>(GET_ME, {
    errorPolicy: 'all',
  });
}
