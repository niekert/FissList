import * as React from 'react';

const PartyIdContext = React.createContext<string | undefined>(undefined);

export function usePartyId() {
  return React.useContext(PartyIdContext);
}

export default PartyIdContext;
