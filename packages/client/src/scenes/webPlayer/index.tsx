import * as React from 'react';
import Spinner from 'components/Spinner';
import WebplayerContext from './context';
import { Script } from 'the-platform';

export function WebPlayerContextContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  let playerRef = React.createRef<Spotify.SpotifyPlayer>();

  // playerRef.current!.
  React.useEffect(() => {
    (window as any).onSpotifyWebPlaybackSDKReady = () => {
      const accessKey = localStorage.getItem('accessToken') as string;

      (playerRef.current as any) = new Spotify.Player({
        name: 'PampaPlay',
        getOAuthToken: cb => {
          cb(accessKey);
        },
      });
    };
  }, []);

  return (
    <WebplayerContext.Provider
      value={{ isReady: true, player: playerRef.current }}
    >
      <Script src="https://sdk.scdn.co/spotify-player.js">{children}</Script>
    </WebplayerContext.Provider>
  );
}
