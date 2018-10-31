import gql from 'graphql-tag';

export const TrackInfo = gql`
  fragment TrackInfo on Track {
    artists {
      id
      name
    }
    id
    name
    uri
  }
`;
