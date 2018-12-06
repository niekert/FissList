import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { API_HOST } from 'app-constants';
import ConnectSpotifyButton from 'components/ConnectSpotifyButton';

interface Props extends RouteComponentProps {}

function SpotifyConnect({ location }: Props) {
  const [, setIsConnecting] = React.useState(false);

  const onClick = () => {
    setIsConnecting(true);
    sessionStorage.setItem('loginUri', location.pathname || '/');
    window.open(`${API_HOST}/authorize`, '_top');
  };

  return <ConnectSpotifyButton onClick={onClick} />;
}

export default withRouter(SpotifyConnect);
