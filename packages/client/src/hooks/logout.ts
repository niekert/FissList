import * as React from 'react';
import CurrentUserContext from 'context/CurrentUser';

function useUnlink(): () => void {
  const currentUser = React.useContext(CurrentUserContext);
  const [isLinked, setIsLinked] = React.useState(true);

  React.useEffect(
    () => {
      if (!isLinked) {
        // Remove from the access key
        localStorage.removeItem('accessToken');

        // Refetch all queries
        if (currentUser) {
          currentUser.refetch();
        }
      }
    },
    [isLinked],
  );

  return () => setIsLinked(false);
}

export default useUnlink;
