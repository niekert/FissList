import * as React from 'react';
import { transparentize } from 'polished';
import Track from 'components/Track';
import { TrackInfo } from 'fragments/__generated__/TrackInfo';
import styled from 'styled-components';
import { AnimatedCheckbox } from 'components/AnimatedCheckbox';

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
  padding: ${props => props.theme.spacing[2]};
  padding-right: ${props => props.theme.spacing[1]};
`;

const StyledTrack = styled(Track)`
  overflow: hidden;
`;

interface Props {
  isSelected: boolean;
  track: TrackInfo;
  onChange: (trackId: string) => void;
}

function SelectableTrackListItem({ isSelected, track, onChange }: Props) {
  return (
    <ListItem isSelected={false}>
      <SelectWrapper>
        <AnimatedCheckbox
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
