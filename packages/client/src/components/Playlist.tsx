import * as React from 'react';
import ContextUriContext from 'context/ContextUri';
import useComponentSize from 'use-component-size-typed';
import { FixedSizeList as List } from 'react-window';
import Track from 'components/Track';
import styled from 'styled-components';
import { PlaylistInfo } from 'fragments/__generated__/PlaylistInfo';

const ScrollableList = styled.div`
  flex: 1;
  overflow: hidden;
`;

function Playlist({ tracks, id }: PlaylistInfo) {
  const listRef = React.useRef<any>(undefined);
  const { height: listHeight } = useComponentSize(listRef);

  const renderTrack = React.useCallback<any>(
    ({ style, index }) => {
      const playlistItem = tracks.items[index];
      return (
        <div key={playlistItem.track.id} style={style}>
          <Track key={playlistItem.track.id} {...playlistItem.track} />
        </div>
      );
    },
    [listHeight, tracks],
  );

  return (
    <ContextUriContext.Provider value={`spotify:playlist:${id}`}>
      <ScrollableList ref={listRef}>
        <List
          key="list"
          height={listHeight || 0}
          itemCount={tracks.items.length}
          itemSize={70}
        >
          {renderTrack}
        </List>
      </ScrollableList>
    </ContextUriContext.Provider>
  );
}

export default Playlist;
