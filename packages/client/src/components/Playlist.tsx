import * as React from 'react';
import Track from 'components/Track';
import { PlaylistInfo } from 'fragments/__generated__/PlaylistInfo';

function Playlist({ tracks, id }: PlaylistInfo) {
  return (
    <>
      {tracks.items.map(playlistItem => (
        <Track key={playlistItem.track.id} {...playlistItem.track} />
      ))}
    </>
  );
}

export default Playlist;
