import * as React from 'react';
import { GetMe } from 'queries/__generated__/GetMe';

interface Context {
  data: GetMe;
  refetch: () => void;
}

export type CurrentUser = Context | undefined;
export default React.createContext<CurrentUser>(undefined);
