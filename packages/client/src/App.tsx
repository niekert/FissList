import * as React from 'react';
import { Router } from '@reach/router';
import Auth from './scenes/auth';

class App extends React.Component {
  public render() {
    return (
      <>
        <Router>
          <Auth path="/auth" />
        </Router>
        <a href="http://localhost:4000/authorize">Log in</a>
      </>
    );
  }
}

export default App;
