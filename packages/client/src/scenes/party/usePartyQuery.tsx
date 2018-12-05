import gql from 'graphql-tag';
import { PartyInfo } from 'fragments/Party';
import { useQuery } from 'react-apollo-hooks';
import {
  GetPartyById,
  GetPartyByIdVariables,
} from './__generated__/GetPartyById';

export const GET_PARTY = gql`
  query GetPartyById($partyId: String!) {
    party(partyId: $partyId) {
      ...PartyInfo
    }
  }

  ${PartyInfo}
`;

export function usePartyQuery(partyId: string) {
  return useQuery<GetPartyById, GetPartyByIdVariables>(GET_PARTY, {
    variables: {
      partyId,
    },
  });
}
