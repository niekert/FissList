import * as React from 'react';
import { transparentize } from 'polished';
import Track from 'components/Track';
import { TrackInfo } from 'fragments/__generated__/TrackInfo';
import styled, { css } from 'styled-components';
import { AnimatedCheckbox } from 'components/AnimatedCheckbox';
import { isTouchDevice } from 'helpers/device';

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

  ${!isTouchDevice &&
    css`
      &:hover {
        cursor: pointer;
        background: ${props =>
          transparentize(0.2, props.theme.colors.activeBackground)};
      }
    `}
`;
const SelectWrapper = styled.div`
  padding: ${props => props.theme.spacing[2]};
  padding-left: ${props => props.theme.spacing[1]};
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
      <StyledTrack {...track} onClick={trackId => onChange(trackId)} />
      <SelectWrapper>
        <AnimatedCheckbox
          checked={isSelected}
          value={track.id}
          onChange={e => onChange(e.target.value)}
        />
      </SelectWrapper>
    </ListItem>
  );
}

export default React.memo(SelectableTrackListItem);
