import gql from 'graphql-tag';
import { TrackInfo } from './Track';

export const PartyInfo = gql`
  fragment PartyInfo on Party {
    id
    name
    permission
    activeTrack {
      ...TrackInfo
    }
    activeTrackId
    requestedUserIds
    ownerUserId
    partyUserIds
  }

  ${TrackInfo}
`;
