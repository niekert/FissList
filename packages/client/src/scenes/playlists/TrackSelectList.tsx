import * as React from 'react';
import FlexVirtualizedList, {
  ItemRenderer,
} from 'components/FlexVirtualizedList';
import { useSelectedTracks } from 'context/SelectedTracks';
import ContextUriContext from 'context/ContextUri';
import Track from 'components/Track';
import {
  PlaylistInfo,
  PlaylistInfo_tracks_items,
} from 'fragments/__generated__/PlaylistInfo';
import { transparentize } from 'polished';
import styled from 'styled-components';

const ListItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  transition: background-color 2s ease-out;
  background-color: ${props =>
    props.isSelected
      ? props.theme.colors.activeBackground
      : props.theme.colors.primary};
  max-width: 100%;
  border-bottom: 1px solid
    ${props => transparentize(0.5, props.theme.colors.outline)};
`;

const SelectWrapper = styled.div`
  width: 30px;
  height: 30px;
  padding: ${props => props.theme.spacing[1]};
`;

const StyledTrack = styled(Track)`
  overflow: hidden;
`;

const Checkbox = styled.input.attrs({
  type: 'checkbox',
})``;

// TODO: Add support for more generic "TrackFeed"
export function TrackSelectList({ tracks, id }: PlaylistInfo) {
  const { toggleTrack, selectedTracks } = useSelectedTracks();

  const renderTrack = React.useCallback<
    ItemRenderer<PlaylistInfo_tracks_items>
  >(
    ({ style, data }) => (
      <ListItem
        key={data.track.id}
        style={style}
        isSelected={selectedTracks.includes(data.track.id)}
      >
        <SelectWrapper>
          <Checkbox
            checked={selectedTracks.includes(data.track.id)}
            value={data.track.id}
            onChange={e => toggleTrack(e.target.value)}
          />
        </SelectWrapper>
        <StyledTrack
          {...data.track}
          onClick={trackId => toggleTrack(trackId)}
        />
      </ListItem>
    ),
    [selectedTracks],
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
