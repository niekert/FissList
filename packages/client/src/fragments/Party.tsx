import gql from 'graphql-tag';
import { PlaylistInfo } from './Playlist';

export const PartyInfo = gql`
  fragment PartyInfo on Party {
    id
    name
    permission
    requestedUserIds
    ownerUserId
    partyUserIds
    queuedTracks {
      uri
      voteCount
    }
    playlist {
      ...PlaylistInfo
    }
  }

  ${PlaylistInfo}
`;
