import gql from 'graphql-tag';

export const PartyInfo = gql`
  fragment PartyInfo on Party {
    id
    name
    permission
    activeTrackId
    requestedUserIds
    ownerUserId
    partyUserIds
  }
`;
