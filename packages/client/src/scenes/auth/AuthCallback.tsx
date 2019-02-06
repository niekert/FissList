import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { parse, OutputParams } from 'query-string';
import { useGetMe } from 'queries/useGetMe';

function AuthCallback({ history }: RouteComponentProps) {
  const me = useGetMe();
  React.useEffect(() => {
    const query: OutputParams = parse(location!.search);

    if (query.token && query.refreshToken) {
      localStorage.setItem('accessToken', query.token as string);
      localStorage.setItem('refreshToken', query.refreshToken as string);
    }

    me.refetch();

    history.replace(sessionStorage.getItem('loginUri') || '', {
      replace: true,
    });
  }, [location!.search]);

  return null;
}
export default withRouter(AuthCallback);
