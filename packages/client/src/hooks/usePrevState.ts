import * as React from 'react';

export function usePrevState<T>(initialState): [T, T, (s: T) => void] {
  const [prevState, setPrevState] = React.useState<T>(initialState);
  const [state, setState] = React.useState<T>(initialState);

  return [
    state,
    prevState,
    nextState => {
      // lol this feels hacky
      if (nextState !== state) {
        setState(nextState);
        setPrevState(state);
      }
    },
  ];
}
