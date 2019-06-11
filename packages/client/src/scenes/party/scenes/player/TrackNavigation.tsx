import * as React from 'react';
import { NextIcon, PlayIcon, PauseIcon } from 'icons';
import IconButton from 'components/IconButton';
import styled, { css } from 'styled-components';

const PlayerNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: ${props => props.theme.spacing[2]};
  z-index: 11;
  pointer-events: all;
  position: relative;
  flex-shrink: 0;
  margin-left: auto;
  background: white;
`;

const NavigateButton = styled(IconButton)`
  border-radius: 50%;
  color: ${props => props.theme.textColors.primaryText};
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }

  svg {
    width: 30px;
    height: 30px;
  }
`;

interface IProps {
  onNext: () => void;
  onPlayPause: () => void;
  isPlaying: boolean;
}

function TrackNavigation({ isPlaying, onNext, onPlayPause }: IProps) {
  return (
    <PlayerNavigation>
      <NavigateButton
        onClick={onPlayPause}
        css={css`
          margin-right: ${props => props.theme.spacing[1]};
        `}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </NavigateButton>
      <NavigateButton onClick={onNext}>
        <NextIcon />
      </NavigateButton>
    </PlayerNavigation>
  );
}

export default TrackNavigation;
