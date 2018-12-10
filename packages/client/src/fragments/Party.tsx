import gql from 'graphql-tag';
import { PlaylistInfo } from './Playlist';

export const PartyInfo = gql`
  fragment PartyInfo on Party {
    id
    activeTrackIndex
    name
    playlistId
    permission
    requestedUserIds
    ownerUserId
    partyUserIds
    playlist {
      ...PlaylistInfo
    }
  }

  ${PlaylistInfo}
`;
