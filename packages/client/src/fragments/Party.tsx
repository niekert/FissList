import gql from 'graphql-tag';

export const PartyInfo = gql`
  fragment PartyInfo on Party {
    id
    name
    permission
    requestedUserIds
    ownerUserId
    partyUserIds
  }
`;
