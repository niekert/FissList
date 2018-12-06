import * as React from 'react';
import { PartyInfo } from 'fragments/__generated__/PartyInfo';

export const PartyContext = React.createContext<PartyInfo>(
  (undefined as unknown) as any,
);

export function usePartyContext(): PartyInfo {
  return React.useContext(PartyContext);
}
