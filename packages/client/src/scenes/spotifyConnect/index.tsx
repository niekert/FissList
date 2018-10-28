import * as React from 'react';
import { API_HOST } from 'app-constants';
import ConnectSpotifyButton from 'components/ConnectSpotifyButton';

function SpotifyConnect() {
  const [, setIsConnecting] = React.useState(false);
  React.useEffect(() => {});

  const onClick = () => {
    setIsConnecting(true);
    window.open(`${API_HOST}/authorize`, '_top');
  };

  return <ConnectSpotifyButton onClick={onClick} />;
}

export default SpotifyConnect;
