import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import {
  PartyMembersQuery,
  PartyMembersQueryVariables,
} from './__generated__/PartyMembersQuery';

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
  return useQuery<PartyMembersQuery, PartyMembersQueryVariables>(
    PARTY_MEMBERS_QUERY,
    { variables: { partyId } },
  );
}
