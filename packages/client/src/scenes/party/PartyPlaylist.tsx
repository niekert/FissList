import * as React from 'react';
import ContextUriContext from 'context/ContextUri';
import { usePlayer } from 'context/player';
import FlexVirtualizedList, {
  ItemRenderer,
} from 'components/FlexVirtualizedList';
import styled, { css } from 'styled-components';
import Track from 'components/Track';
import { transparentize } from 'polished';
import {
  PlaylistInfo,
  PlaylistInfo_tracks_items,
} from 'fragments/__generated__/PlaylistInfo';

const PlaylistItem = styled.div<{ isActive: boolean }>`
  border-bottom: 1px solid
    ${props => transparentize(0.5, props.theme.colors.outline)};

  ${props =>
    props.isActive &&
    css`
      background: ${transparentize(0.9, props.theme.colors.cta)};
    `}
`;

type Props = PlaylistInfo & {
  activeTrackIndex?: number;
};

function PartyPlaylist({ tracks, id, activeTrackIndex }: Props) {
  const player = usePlayer();
  // lol
  const activeItem =
    player && player.data && player.data.player && player.data.player!.item;

  const renderTrack = React.useCallback<
    ItemRenderer<PlaylistInfo_tracks_items>
  >(
    ({ style, data, index }) => {
      return (
        <PlaylistItem
          key={data.track.id}
          style={style}
          isActive={activeTrackIndex === index}
        >
          <Track {...data.track} />
        </PlaylistItem>
      );
    },
    [tracks, activeItem],
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

export default PartyPlaylist;
