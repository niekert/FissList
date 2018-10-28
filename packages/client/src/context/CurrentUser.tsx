import * as React from 'react';
import { QueryResult } from 'queries/GetMe';

export default React.createContext<QueryResult | undefined>(undefined);
