import * as React from 'react';
import ContextUriContext from 'context/ContextUri';
import Track from 'components/Track';
import PosedListItem from 'components/PosedListItem';
import { PoseGroup } from 'react-pose';
import { PlaylistInfo } from 'fragments/__generated__/PlaylistInfo';

function Playlist({ tracks, id }: PlaylistInfo) {
  return (
    <ContextUriContext.Provider value={`spotify:playlist:${id}`}>
      <PoseGroup animateOnMount={true}>
        {tracks.items.map((playlistItem, i) => (
          <PosedListItem key={playlistItem.track.id} i={i} delayBase={50}>
            <Track key={playlistItem.track.id} {...playlistItem.track} />
          </PosedListItem>
        ))}
      </PoseGroup>
    </ContextUriContext.Provider>
  );
}

export default Playlist;
