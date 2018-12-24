import * as React from 'react';
import {
  useMutation,
  MutationHookOptions,
  FetchResult,
} from 'react-apollo-hooks';
import { DocumentNode } from 'graphql';

export default function useStateMutation<Mutation, MutationVariables>(
  query: DocumentNode,
) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [lastResult, setResult] = React.useState<
    FetchResult<Mutation> | undefined
  >(undefined);

  const mutationFn = useMutation<Mutation, MutationVariables>(query);

  const mutate = async (
    options: MutationHookOptions<Mutation, MutationVariables>,
  ) => {
    setIsLoading(true);
    setIsSuccess(false);

    const result = await mutationFn(options);

    setIsSuccess(!result.errors);
    setIsLoading(false);
    setResult(result);
  };

  const clearSuccess = () => {
    setIsSuccess(false);
  };

  return {
    mutate,
    isLoading,
    isSuccess,
    data: lastResult && lastResult.data,
    errors: lastResult && lastResult.errors,
    clearSuccess,
  };
}
