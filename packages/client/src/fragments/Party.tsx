import gql from 'graphql-tag';
import { PlaylistInfo } from './Playlist';

export const PartyInfo = gql`
  fragment PartyInfo on Party {
    id
    activeTrackIndex
    name
    playlistId
    playlist {
      ...PlaylistInfo
    }
  }

  ${PlaylistInfo}
`;
