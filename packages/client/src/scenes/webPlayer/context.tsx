import { createContext } from 'react';

interface WebplayerContext {
  isReady: boolean;
  player?: null | Spotify.SpotifyPlayer;
}

export default createContext<WebplayerContext>({
  isReady: false,
  player: null,
});
