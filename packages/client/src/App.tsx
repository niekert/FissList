import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import CurrentUserContext from './context/CurrentUser';
import { PlayerContainer } from './context/player';
import GetMe from 'queries/GetMe';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
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
  body {
    color: red;
  }
`;

function App() {
  return (
    <Theme>
      <BrowserRouter>
        <Route path="/auth" component={Auth} />

        <GlobalStyle />
        <GetMe>
          {result => {
            const { loading, data } = result;
            if (loading) {
              return null;
            }

            if (!data || !data.me) {
              return <Landing />;
            }

            return (
              <PlayerContainer>
                <CurrentUserContext.Provider value={result}>
                  <Switch>
                    <Route path="/new" component={NewParty} />
                    <Route path="/join" component={JoinParty} />
                    <Route path="/party/:partyId" component={Party} />
                    <Route path="" component={SelectType} />
                  </Switch>
                </CurrentUserContext.Provider>
              </PlayerContainer>
            );
          }}
        </GetMe>
      </BrowserRouter>
    </Theme>
  );
}

export default App;
