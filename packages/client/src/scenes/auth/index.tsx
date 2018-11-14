import * as React from 'react';
import { __RouterContext as RouterContext } from 'react-router-dom';
import { withRouter } from 'react-router';
import { parse, OutputParams } from 'query-string';

interface IProps {
  path: string;
}

function AuthCallback({ location, navigate }: IProps) {
  const bla = React.useContext(RouterContext);
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
export default withRouter(AuthCallback);
