import * as React from 'react';

enum Actions {
  TOGGLE_TRACK,
}

export type State = ReadonlyArray<string>;
export type Reducer = (s: State, a: any) => State;

export interface ActionCreators {
  toggleTrack: (trackId) => void;
}

const initialState = [];

function selectedTracksReducer(state: State, action) {
  switch (action.type) {
    case Actions.TOGGLE_TRACK: {
      if (state.includes(action.payload)) {
        return state.filter(trackId => trackId !== action.payload);
      }

      return [action.payload, ...state];
    }
  }
  return [];
}

const noProvider = () => {
  throw new Error('Action creator was called without a provider');
};

const SelectedTracksContext = React.createContext<[State, ActionCreators]>([
  [],
  {
    toggleTrack: noProvider,
  },
]);

export function SelectedTracksContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer<State, any>(
    selectedTracksReducer,
    initialState,
  );

  const toggleTrack = React.useCallback(trackId => {
    dispatch({
      type: Actions.TOGGLE_TRACK,
      payload: trackId,
    });
  }, []);

  const context = React.useMemo<[State, ActionCreators]>(
    () => [state, { toggleTrack }],
    [state],
  );

  return (
    <SelectedTracksContext.Provider value={context}>
      {children}
    </SelectedTracksContext.Provider>
  );
}

export const useSelectedTracks = () => React.useContext(SelectedTracksContext);
