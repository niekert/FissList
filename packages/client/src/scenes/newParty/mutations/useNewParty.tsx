import gql from 'graphql-tag';
import { useStateMutation } from 'hooks';
import { NewParty, NewPartyVariables } from './__generated__/NewParty';
import { PartyInfo } from 'fragments/Party';

export const NEW_PARTY_MUTATION = gql`
  mutation NewParty(
    $name: String!
    $trackUris: [String!]
    $playlistId: String!
  ) {
    createParty(name: $name, trackUris: $trackUris, playlistId: $playlistId) {
      ...PartyInfo
    }
  }

  ${PartyInfo}
`;

export function useNewParty() {
  return useStateMutation<NewParty, NewPartyVariables>(NEW_PARTY_MUTATION);
}
