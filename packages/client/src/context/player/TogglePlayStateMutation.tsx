import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import {
  TogglePlayState,
  TogglePlayStateVariables,
} from './__generated__/TogglePlayState';

export const TOGGLE_PLAY_STATE_MUTATION = gql`
  mutation TogglePlayState($type: String!, $uri: String) {
    togglePlayState(type: $type, uri: $uri)
  }
`;

class TogglePlayStateMutation extends Mutation<
  TogglePlayState,
  TogglePlayStateVariables
> {}
export type TogglePlayingMutationFn = MutationFn<
  TogglePlayState,
  TogglePlayStateVariables
>;

interface IProps {
  children: (
    mutate: TogglePlayingMutationFn,
    result: MutationResult<TogglePlayState>,
  ) => React.ReactNode;
  update?: () => void;
}

// TODO: magic const. Is that aight?
const refetchQueries = ['Player'];

export default function TogglePlayingMutationComponent({
  children,
  update,
  ...props
}: IProps) {
  return (
    <TogglePlayStateMutation
      mutation={TOGGLE_PLAY_STATE_MUTATION}
      refetchQueries={refetchQueries}
      {...props}
    >
      {children}
    </TogglePlayStateMutation>
  );
}
