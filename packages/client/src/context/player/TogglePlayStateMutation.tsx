import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import {
  TogglePlayState,
  TogglePlayStateVariables,
} from './__generated__/TogglePlayState';
import { ApolloCache } from 'apollo-cache';
import { PLAYER_QUERY, Player } from './PlayerQuery';

export const TOGGLE_PLAY_STATE_MUTATION = gql`
  mutation TogglePlayState(
    $type: String!
    $contextUri: String
    $offsetUri: String
  ) {
    togglePlayState(
      type: $type
      contextUri: $contextUri
      offsetUri: $offsetUri
    ) {
      __typename
      isPlaying
    }
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

const update = (
  cache: ApolloCache<any>,
  mutation: MutationResult<TogglePlayState>,
) => {
  const query = cache.readQuery<Player>({ query: PLAYER_QUERY });

  if (query) {
    cache.writeQuery({
      query: PLAYER_QUERY,
      data: {
        player: {
          ...query.player,
          isPlaying: mutation.data!.togglePlayState!.isPlaying,
        },
      },
    });
  }
};

export default function TogglePlayingMutationComponent({
  children,
  ...props
}: IProps) {
  return (
    <TogglePlayStateMutation
      mutation={TOGGLE_PLAY_STATE_MUTATION}
      update={update}
      refetchQueries={[{ query: PLAYER_QUERY }]}
      {...props}
    >
      {children}
    </TogglePlayStateMutation>
  );
}
