import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

export const PARTY_MEMBERS_QUERY = gql`
  query PartyMembersQuery($partyId: String!) {
    partyMembers(partyId: $partyId) {
      requestedUsers {
        userId
        displayName
      }
      partyMembers {
        userId
        displayName
      }
    }
  }
`;

export function usePartyMembersQuery(partyId: string) {
  return useQuery(PARTY_MEMBERS_QUERY, { variables: partyId });
}
