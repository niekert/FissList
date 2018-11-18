import * as React from 'react';
import ContextUriContext from 'context/ContextUri';
import FlexVirtualizedList, { ItemRenderer } from './FlexVirtualizedList';
import styled from 'styled-components';
import Track from 'components/Track';
import { transparentize } from 'polished';
import {
  PlaylistInfo,
  PlaylistInfo_tracks_items,
} from 'fragments/__generated__/PlaylistInfo';

const PlaylistItem = styled.div`
  border-bottom: 1px solid
    ${props => transparentize(0.5, props.theme.colors.outline)};
`;

function Playlist({ tracks, id }: PlaylistInfo) {
  const renderTrack = React.useCallback<
    ItemRenderer<PlaylistInfo_tracks_items>
  >(
    ({ style, data }) => {
      return (
        <PlaylistItem key={data.track.id} style={style}>
          <Track {...data.track} />
        </PlaylistItem>
      );
    },
    [tracks],
  );

  return (
    <ContextUriContext.Provider value={`spotify:playlist:${id}`}>
      <FlexVirtualizedList<PlaylistInfo_tracks_items>
        itemSize={70}
        items={tracks.items}
      >
        {renderTrack}
      </FlexVirtualizedList>
    </ContextUriContext.Provider>
  );
}

export default Playlist;
