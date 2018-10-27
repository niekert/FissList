import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import GetMe from 'queries/GetMe';
import { Router } from '@reach/router';
import Auth from './scenes/auth';
import Landing from 'scenes/landing';
import Header from 'scenes/header';
import Theme from './theme';

const GlobalStyle = createGlobalStyle`
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
          {({ data, loading, error }) => {
            if (loading) {
              return null;
            }

            if (!data || !data.getMe) {
              return <Landing />;
            }

            return (
              <>
                <Header />
                <a href="http://localhost:4000/authorize">Log in</a>
              </>
            );
          }}
        </GetMe>
      </>
    </Theme>
  );
}

export default App;
