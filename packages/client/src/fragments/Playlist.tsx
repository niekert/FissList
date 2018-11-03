import gql from 'graphql-tag';
import { TrackInfo } from './Track';

export const PlaylistInfo = gql`
  fragment PlaylistInfo on Playlist {
    name
    id
    tracks {
      items {
        addedAt
        track {
          ...TrackInfo
        }
      }
      total
      href
    }
  }

  ${TrackInfo}
`;
