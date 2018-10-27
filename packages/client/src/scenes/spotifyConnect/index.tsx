import * as React from 'react';
import ConnectSpotifyButton from 'components/ConnectSpotifyButton';

function SpotifyConnect() {
  const [, setIsConnecting] = React.useState(false);
  React.useEffect(() => {});

  const onClick = () => {
    setIsConnecting(true);
    window.open('http://localhost:4000/authorize', '_top');
  };

  return <ConnectSpotifyButton onClick={onClick} />;
}

export default SpotifyConnect;
