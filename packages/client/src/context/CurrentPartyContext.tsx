import * as React from 'react';

export const CurrentPartyContext = React.createContext(undefined);

export function useCurrentPartyContext() {
  return React.useContext(CurrentPartyContext);
}
