import * as React from 'react';
import ApolloClient from 'apollo-client';

function useUnlink(apolloClient: ApolloClient<any>): () => void {
  const [isLinked, setIsLinked] = React.useState(true);

  React.useEffect(
    () => {
      if (!isLinked) {
        // Remove from the access key
        localStorage.removeItem('accessToken');

        // Refetch all queries
        apolloClient.reFetchObservableQueries();
      }
    },
    [isLinked],
  );

  return () => setIsLinked(false);
}

export default useUnlink;
