import * as React from 'react';
import { UserInfo } from 'fragments/__generated__/UserInfo';

const CurrentuserContext = React.createContext<UserInfo | undefined>(undefined);

export function useCurrentUser() {
  return React.useContext(CurrentuserContext);
}

export default CurrentuserContext;
