import * as React from 'react';
import { parse, OutputParams } from 'query-string';
import { RouteComponentProps } from '@reach/router';

interface IProps {
  path: string;
}

function AuthCallback({
  location,
  navigate,
  path,
}: RouteComponentProps & IProps) {
  React.useEffect(
    () => {
      const query: OutputParams = parse(location!.search);

      if (query.token && query.refreshToken) {
        localStorage.setItem('accessToken', query.token as string);
        localStorage.setItem('refreshToken', query.refreshToken as string);
      }

      navigate!('/', { replace: true });
    },
    [location!.search],
  );

  return null;
}
export default AuthCallback;
