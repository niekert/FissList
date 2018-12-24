import gql from 'graphql-tag';
import { useStateMutation } from 'hooks';
import { NewParty, NewPartyVariables } from './__generated__/NewParty';

export const NEW_PARTY_MUTATION = gql`
  mutation NewParty($name: String!, $playlistId: String!) {
    createParty(name: $name, playlistId: $playlistId) {
      id
      name
      playlistId
    }
  }
`;

export function useNewParty() {
  return useStateMutation<NewParty, NewPartyVariables>(NEW_PARTY_MUTATION);
}
