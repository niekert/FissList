import * as React from 'react';
import { QueryResult } from 'queries/GetMe';

export type CurrentUser = QueryResult | undefined;
export default React.createContext<CurrentUser>(undefined);
