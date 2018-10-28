import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import CurrentUserContext from './context/CurrentUser';
import GetMe from 'queries/GetMe';
import { Router } from '@reach/router';
import Auth from './scenes/auth';
import Landing from 'scenes/landing';
import PartySelect from 'scenes/partySelect';
import Theme from './theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased
  }
  body {
    color: red;
  }
`;

function App() {
  return (
    <Theme>
      <>
        <Router>
          <Auth path="/auth" />
        </Router>
        <GlobalStyle />
        <GetMe>
          {result => {
            const { loading, data } = result;
            if (loading) {
              return null;
            }

            if (!data || !data.getMe) {
              return <Landing />;
            }

            return (
              <CurrentUserContext.Provider value={result}>
                <PartySelect />
              </CurrentUserContext.Provider>
            );
          }}
        </GetMe>
      </>
    </Theme>
  );
}

export default App;
