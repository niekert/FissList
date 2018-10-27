import * as React from 'react';
import { parse } from 'query-string';
import { RouteComponentProps } from '@reach/router';

interface Props {
  path: string;
}

function AuthCallback({ location, path }: RouteComponentProps & Props) {
  React.useEffect(() => {
    const query = parse(location!.search);

    console.log('query is', query);
  });

  return <div>Wow hello</div>;
}
export default AuthCallback;
