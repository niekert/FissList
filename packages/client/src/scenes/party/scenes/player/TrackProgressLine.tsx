import * as React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';

const INCREMENT_PROGRESS_TIMEOUT_MS = 1000;

const ActiveLineWrapper = styled.div`
  display: flex;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  overflow: hidden;
  background: ${props => transparentize(0.9, props.theme.colors.cta)};
`;

const ActiveLine = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => transparentize(0.35, props.theme.colors.cta)};
`;

interface Props {
  paused: boolean;
  duration: number;
  position: number;
}

interface SetDurationAction {
  type: 'SET_PROGRESS';
  payload: number;
}

interface IncrementDurationAction {
  type: 'INCREMENT_PROGRESS';
}

type Actions = SetDurationAction | IncrementDurationAction;

function reducer(state: number, action: Actions) {
  switch (action.type) {
    case 'SET_PROGRESS': {
      return action.payload;
    }
    case 'INCREMENT_PROGRESS': {
      return state + INCREMENT_PROGRESS_TIMEOUT_MS;
    }
  }

  return state;
}

function TrackProgressLine({ paused, duration, position }: Props) {
  const [progressMs, dispatch] = React.useReducer<typeof reducer>(
    reducer,
    position,
  );

  React.useEffect(() => {
    dispatch({ type: 'SET_PROGRESS', payload: position });
  }, [position]);

  React.useEffect(() => {
    if (paused) {
      return;
    }

    const timeout = setTimeout(() => {
      dispatch({ type: 'INCREMENT_PROGRESS' });
    }, INCREMENT_PROGRESS_TIMEOUT_MS);

    return () => clearTimeout(timeout);
  }, [paused, duration, position, progressMs]);

  const percentage = progressMs > 0 ? (progressMs / duration) * 100 : 0;

  return (
    <ActiveLineWrapper>
      <ActiveLine style={{ transform: `translateX(${-100 + percentage}%)` }} />
    </ActiveLineWrapper>
  );
}

export default TrackProgressLine;
