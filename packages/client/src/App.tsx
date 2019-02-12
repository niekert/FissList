import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { createGlobalStyle } from 'styled-components';
import CurrentUserContext from './context/CurrentUser';
import { useGetMe } from 'queries/useGetMe';
import ErrorBoundary from 'components/ErrorBoundary';
import { Route, Router, Switch } from 'react-router-dom';
import SelectType from 'scenes/selectType';
import { AuthCallback } from './scenes/auth';
import Landing from 'scenes/landing';
import Spinner from 'components/Spinner';

const AsyncNewParty = React.lazy(() => import('scenes/newParty'));
const AsyncJoinparty = React.lazy(() => import('scenes/joinParty'));
const AsyncParty = React.lazy(() => import('scenes/party'));

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -webkit-overflow-scrolling: touch;
  }

  form {
    margin-bottom: 0;
  }
`;

function App({ history }: { history: any }) {
  const me = useGetMe();

  return (
    <ErrorBoundary>
      <CurrentUserContext.Provider
        value={me.data.me ? me.data.me.user : undefined}
      >
        <Router history={history}>
          <React.Suspense fallback={<Spinner />}>
            <Route path="/auth" component={AuthCallback} />

            <GlobalStyle />

            {(!me.data || !me.data.me) && <Landing />}

            {me.data && me.data.me && (
              <Switch>
                <Route path="/new" component={AsyncNewParty} />
                <Route path="/join" component={AsyncJoinparty} />
                <Route path="/party/:partyId" component={AsyncParty} />
                <Route
                  path=""
                  render={props => (
                    <SelectType {...props} parties={me.data.me!.parties} />
                  )}
                />
              </Switch>
            )}
          </React.Suspense>
        </Router>
      </CurrentUserContext.Provider>
    </ErrorBoundary>
  );
}

export default hot(App);
