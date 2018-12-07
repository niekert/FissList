import * as React from 'react';
import { Script } from 'the-platform';
import { placeholder } from 'polished';

// tslint:disable-next-line
const noop = e => {
  console.log('wa is di', e);
};

interface Options {
  name: string;
  getOAuthToken: () => string;
  accountError?: (e: any) => void;
  onReady?: (deviceId: string) => void;
  onPlayerStateChanged?: (state: any) => void;
}
export function useSpotifyWebSdk({
  name,
  getOAuthToken,
  accountError = noop,
  onReady = noop,
  onPlayerStateChanged = noop,
}: Options) {
  const [isReady, setIsReady] = React.useState(false);
  const [deviceId, setDeviceId] = React.useState<string>('');
  const playerRef = React.useRef<Spotify.SpotifyPlayer | null>(null);

  // playerRef.current!.
  React.useEffect(() => {
    (window as any).onSpotifyWebPlaybackSDKReady = () => {
      playerRef.current = new Spotify.Player({
        name,
        getOAuthToken: cb => cb(getOAuthToken()),
      });
      setIsReady(true);
    };
  }, []);

  const handleReady = React.useCallback(({ device_id: readyDeviceId }) => {
    console.log('is ready', readyDeviceId);
    setDeviceId(readyDeviceId);

    if (onReady) {
      onReady(deviceId);
    }
  }, []);

  React.useEffect(
    () => {
      const player = playerRef.current!;
      if (isReady) {
        player.addListener('account_error', accountError);
        player.addListener('ready', handleReady);
        player.addListener('initialization_error', accountError);
        player.addListener('authentication_error', accountError);
        player.addListener('not_ready', accountError);
        player.addListener('player_state_changed', onPlayerStateChanged);

        player.connect();

        return () => {
          player.removeListener('account_error', accountError);
          player.removeListener('ready', handleReady);
          player.removeListener('player_state_changed', onPlayerStateChanged);
        };
      }

      return;
    },
    [isReady],
  );

  return {
    deviceId,
    script: <Script src="https://sdk.scdn.co/spotify-player.js">{''}</Script>,
  };
}
