// import * as React from 'react';
// import { Script } from 'the-platform';
// import {usePlayerQuery } from './usePlayerQuery'
// import PlayerContext from './PlayerContext'

// function WebSdkPlayerContainer({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const player = usePlayerQuery();
//   let playerRef = React.createRef<Spotify.SpotifyPlayer>();

//   // playerRef.current!.
//   React.useEffect(() => {
//     (window as any).onSpotifyWebPlaybackSDKReady = () => {
//       const accessKey = localStorage.getItem('accessToken') as string;

//       (playerRef.current as any) = new Spotify.Player({
//         name: 'PampaPlay',
//         getOAuthToken: cb => {
//           cb(accessKey);
//         },
//       });
//     };
//   }, []);

//   const togglePlayState = () => {}
//   const setActiveDevice = () => {}

//   console.log('rendering script');
//   return (
//     <PlayerContext.Provider
//       value={{ ...player, togglePlayState, setActiveDevice }}
//     >
//       <Script src="https://sdk.scdn.co/spotify-player.js">{children}</Script>
//     </PlayerContext.Provider.Provider>
//   );
