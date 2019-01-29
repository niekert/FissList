import * as React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';

const ActiveLineWrapper = styled.div`
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: ${props => transparentize(0.9, props.theme.colors.cta)};
`;

const ActiveLine = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => transparentize(0.5, props.theme.colors.cta)};
`;

interface Props {
  paused: boolean;
  duration: number;
  position: number;
}

type Actions = SetDurationAction;

interface SetDurationAction {
  type: 'SET_DURATION';
  payload: number;
}

function reducer(state: number, action: Actions) {
  switch (action.type) {
    case 'SET_DURATION': {
      return action.payload;
    }
  }

  return state;
}

function TrackProgressLine({ paused, duration, position }: Props) {
  const [progressMs, dispatch] = React.useReducer<number, Actions>(
    reducer,
    position,
  );

  React.useEffect(
    () => {
      dispatch({ type: 'SET_DURATION', payload: position });
    },
    [position],
  );

  React.useEffect(
    () => {
      if (paused) {
        return;
      }

      // Everytime either of these changes, we recalculate the timer
      const timeout = setTimeout(() => {
        dispatch({ type: 'SET_DURATION', payload: progressMs + 1000 });
      }, 1000);

      return () => clearTimeout(timeout);
    },
    [paused, duration, position, progressMs],
  );

  const percentage = progressMs > 0 ? (progressMs / duration) * 100 : 0;

  return (
    <ActiveLineWrapper>
      <ActiveLine style={{ transform: `translateX(${-100 + percentage}%)` }} />
    </ActiveLineWrapper>
  );
}

export default TrackProgressLine;
