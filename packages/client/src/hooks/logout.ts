import * as React from 'react';
import { useGetMe } from 'queries/useGetMe';

function useUnlink(): () => void {
  const currentUserQuery = useGetMe();
  const [isLinked, setIsLinked] = React.useState(true);

  React.useEffect(
    () => {
      if (!isLinked) {
        // Remove from the access key
        localStorage.removeItem('accessToken');

        // Refetch all queries
        currentUserQuery.refetch();
      }
    },
    [isLinked],
  );

  return () => setIsLinked(false);
}

export default useUnlink;
