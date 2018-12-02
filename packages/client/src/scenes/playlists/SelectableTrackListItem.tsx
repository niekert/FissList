import * as React from 'react';
import { transparentize } from 'polished';
import Track from 'components/Track';
import { PlaylistInfo_tracks_items } from 'fragments/__generated__/PlaylistInfo';
import styled from 'styled-components';

const ListItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  transition: background-color 0.2s ease-out;
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

interface Props extends PlaylistInfo_tracks_items {
  isSelected: boolean;
  onChange: (trackId: string) => void;
}

function SelectableTrackListItem({
  isSelected,
  track,
  addedAt,
  onChange,
}: Props) {
  return (
    <ListItem key={`${addedAt}-${track.id}`} isSelected={isSelected}>
      <SelectWrapper>
        <Checkbox
          checked={isSelected}
          value={track.id}
          onChange={e => onChange(e.target.value)}
        />
      </SelectWrapper>
      <StyledTrack {...track} onClick={trackId => onChange(trackId)} />
    </ListItem>
  );
}

export default React.memo(SelectableTrackListItem);
