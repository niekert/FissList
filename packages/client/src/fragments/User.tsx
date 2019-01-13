import gql from 'graphql-tag';

export const UserInfo = gql`
  fragment UserInfo on SpotifyUser {
    displayName
    email
    id
    href
  }
`;
