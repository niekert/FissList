import * as React from 'react';
import { useMutation, MutationHookOptions } from 'react-apollo-hooks';
import { DocumentNode } from 'graphql';

export default function useStateMutation<Mutation, MutationVariables>(
  query: DocumentNode,
) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const mutationFn = useMutation<Mutation, MutationVariables>(query);

  const mutate = async (
    options: MutationHookOptions<Mutation, MutationVariables>,
  ) => {
    setIsLoading(true);
    setIsSuccess(false);

    const result = await mutationFn(options);

    setIsSuccess(!result.errors);
    setIsLoading(false);
  };

  const clearSuccess = () => {
    setIsSuccess(false);
  };

  return {
    mutate,
    isLoading,
    isSuccess,
    clearSuccess,
  };
}
