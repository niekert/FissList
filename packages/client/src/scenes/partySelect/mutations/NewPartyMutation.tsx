import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import { NewParty, NewPartyVariables } from './__generated__/NewParty';

export const NEW_PARTY_MUTATION = gql`
  mutation NewParty($name: String!, $basePlaylistId: String!) {
    createParty(name: $name, basePlaylistId: $basePlaylistId) {
      id
      name
      basePlaylistId
    }
  }
`;

class NewPartyMutation extends Mutation<NewParty, NewPartyVariables> {}

interface IProps {
  children: (
    mutate: MutationFn<NewParty, NewPartyVariables>,
    result: MutationResult<NewParty>,
  ) => React.ReactNode;
}

export default function NewPartyMutationComponent({
  children,
  ...props
}: IProps) {
  return (
    <NewPartyMutation mutation={NEW_PARTY_MUTATION} {...props}>
      {children}
    </NewPartyMutation>
  );
}
