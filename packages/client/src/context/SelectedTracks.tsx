import * as React from 'react';

enum Actions {
  TOGGLE_TRACK,
  COMMIT_TRACKS,
  RESET_COMMIT_SUCCESS,
}

export interface State {
  selectedTracks: string[];
  unseenTracks: string[];
  commitSuccess: boolean;
}
export type Reducer = (s: State, a: any) => State;

export interface Context extends State {
  toggleTrack: (trackId) => void;
  commitTracks: () => void;
}

const initialState = {
  selectedTracks: [],
  unseenTracks: [],
  commitSuccess: false,
};

function selectedTracksReducer(state: State, action) {
  switch (action.type) {
    case Actions.TOGGLE_TRACK: {
      if (state.selectedTracks.includes(action.payload)) {
        return {
          ...state,
          selectedTracks: state.selectedTracks.filter(
            trackId => trackId !== action.payload,
          ),
        };
      }

      return {
        ...state,
        selectedTracks: [...state.selectedTracks, action.payload],
      };
    }
    case Actions.COMMIT_TRACKS: {
      return {
        ...state,
        unseenTracks: [...initialState.selectedTracks],
        selectedTracks: [],
        commitSuccess: true,
      };
    }
    case Actions.RESET_COMMIT_SUCCESS: {
      return {
        ...state,
        commitSuccess: false,
      };
    }
    default: {
      return state;
    }
  }
}

const noProvider = () => {
  throw new Error('Action creator was called without a provider');
};

const SelectedTracksContext = React.createContext<Context>({
  selectedTracks: [],
  unseenTracks: [],
  commitSuccess: false,
  toggleTrack: noProvider,
  commitTracks: noProvider,
});

export function SelectedTracksContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer<State, any>(
    selectedTracksReducer,
    initialState,
  );

  React.useEffect(
    () => {
      if (state.commitSuccess) {
        const timeout = setTimeout(
          () =>
            dispatch({
              type: Actions.RESET_COMMIT_SUCCESS,
            }),
          2000,
        );

        return () => clearTimeout(timeout);
      }

      return undefined;
    },
    [state.commitSuccess],
  );

  const toggleTrack = React.useCallback(trackId => {
    dispatch({
      type: Actions.TOGGLE_TRACK,
      payload: trackId,
    });
  }, []);
  const commitTracks = React.useCallback(() => {
    dispatch({
      type: Actions.COMMIT_TRACKS,
    });
  }, []);

  const context = React.useMemo<Context>(
    () => ({ ...state, toggleTrack, commitTracks }),
    [state],
  );

  return (
    <SelectedTracksContext.Provider value={context}>
      {children}
    </SelectedTracksContext.Provider>
  );
}

export const useSelectedTracks = () => React.useContext(SelectedTracksContext);
