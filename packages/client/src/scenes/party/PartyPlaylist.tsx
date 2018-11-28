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
      background: ${props.theme.colors.activeBackground};
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
    [tracks, activeItem, activeTrackIndex],
  );

  return (
    <ContextUriContext.Provider value={`spotify:playlist:${id}`}>
      {tracks.items.map((item, index) => (
        <PlaylistItem key={item.track.id} isActive={activeTrackIndex === index}>
          <Track {...item.track} />
        </PlaylistItem>
      ))}
    </ContextUriContext.Provider>
  );
}

export default PartyPlaylist;
