import * as React from 'react';
import { Script } from 'the-platform';
import { placeholder } from 'polished';

// tslint:disable-next-line
const noop = e => {};

interface Options {
  name: string;
  getOAuthToken: () => Promise<string>;
  accountError?: (e: any) => void;
  onReady?: (deviceId: string) => void;
  onPlayerStateChanged?: (state: StateChange) => void;
}

interface WebPlayTrack {
  uri: string;
  id: string;
  type: 'track' | 'episode';
  name: string;
}

export interface StateChange {
  context: {
    uri: string;
    metadata: any;
  };
  track_window: {
    current_track: WebPlayTrack;
  };
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
        getOAuthToken: async cb => {
          const token = await getOAuthToken();
          cb(token);
        },
      });
      setIsReady(true);
    };
  }, []);

  const handleReady = React.useCallback(({ device_id: readyDeviceId }) => {
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
