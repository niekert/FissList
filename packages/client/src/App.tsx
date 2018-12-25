import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import CurrentUserContext from './context/CurrentUser';
import { useGetMe } from 'queries/useGetMe';
import ErrorBoundary from 'components/ErrorBoundary';
import { Route, Router, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Spinner from 'components/Spinner';
import NewParty from 'scenes/newParty';
import SelectType from 'scenes/selectType';
import JoinParty from 'scenes/joinParty';
import Auth from './scenes/auth';
import Landing from 'scenes/landing';
import Theme from './theme';
import Party from 'scenes/party';

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

const PageLoader = styled(Spinner)`
  min-height: 100vh;
`;

const history = createHistory();

function App() {
  const me = useGetMe();

  return (
    <Theme>
      <ErrorBoundary>
        <CurrentUserContext.Provider
          value={{ data: me.data, refetch: me.refetch }}
        >
          <Router history={history}>
            <React.Suspense fallback={<PageLoader />}>
              <Route path="/auth" component={Auth} />

              <GlobalStyle />
              {me.loading && <PageLoader />}

              {(!me.data || !me.data.me) && <Landing />}

              {me.data && me.data.me && (
                <Switch>
                  <Route path="/new" component={NewParty} />
                  <Route path="/join" component={JoinParty} />
                  <Route path="/party/:partyId" component={Party} />
                  <Route path="" component={SelectType} />
                </Switch>
              )}
            </React.Suspense>
          </Router>
        </CurrentUserContext.Provider>
      </ErrorBoundary>
    </Theme>
  );
}

export default App;
