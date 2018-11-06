import * as React from 'react';
import { NextIcon, PlayIcon, PauseIcon, PrevIcon } from 'icons';
import IconButton from 'components/IconButton';
import styled from 'styled-components';

const PlayerNavigation = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex: 1;
  background: white;
  padding-top: ${props => props.theme.spacing[1]};
  padding-bottom: 4px;
`;

const PlayButton = styled(IconButton)`
  border-radius: 50%;
  color: ${props => props.theme.textColors.primaryText};
  border: 3px solid ${props => props.theme.textColors.primaryText};
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }

  svg {
    padding: 12px;
    width: 50px;
    height: 50px;
  }
`;

const NavigateButton = styled(PlayButton)`
  margin: 0 ${props => props.theme.spacing[2]};

  svg {
    padding: 6px;
    width: 32px;
    height: 32px;
  }
`;

interface IProps {
  onPrev: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  isPlaying: boolean;
}

function TrackNavigation({ isPlaying, onPrev, onNext, onPlayPause }: IProps) {
  return (
    <PlayerNavigation>
      <NavigateButton onClick={onPrev}>
        <PrevIcon />
      </NavigateButton>
      <PlayButton onClick={onPlayPause}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </PlayButton>
      <NavigateButton onClick={onNext}>
        <NextIcon />
      </NavigateButton>
    </PlayerNavigation>
  );
}

export default TrackNavigation;
