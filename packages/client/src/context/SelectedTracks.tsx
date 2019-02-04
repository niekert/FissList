import * as React from 'react';

enum Actions {
  TOGGLE_TRACK,
  COMMIT_TRACKS,
  RESET_COMMIT_SUCCESS,
  CLEAR_SELECTED_TRACKS,
  MARK_TRACK_SEEN,
}

export interface State {
  selectedTracks: string[];
  commitSuccess: boolean;
}
export type Reducer = (s: State, a: any) => State;

export interface Context extends State {
  toggleTrack: (trackId) => void;
  commitTracks: () => void;
  clearSelectedTracks: () => void;
}

const initialState = {
  selectedTracks: [],
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
        unseenTracks: [...state.selectedTracks],
        selectedTracks: [],
        commitSuccess: true,
      };
    }
    case Actions.CLEAR_SELECTED_TRACKS: {
      return {
        ...state,
        selectedTracks: [],
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
  commitSuccess: false,
  clearSelectedTracks: noProvider,
  toggleTrack: noProvider,
  commitTracks: noProvider,
});

export function SelectedTracksContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer<typeof selectedTracksReducer>(
    selectedTracksReducer,
    initialState,
  );

  React.useEffect(() => {
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
  }, [state.commitSuccess]);

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

  const clearSelectedTracks = React.useCallback(
    () =>
      dispatch({
        type: Actions.CLEAR_SELECTED_TRACKS,
      }),
    [],
  );

  const context = React.useMemo<Context>(
    () => ({
      ...state,
      toggleTrack,
      commitTracks,
      clearSelectedTracks,
    }),
    [state],
  );

  return (
    <SelectedTracksContext.Provider value={context}>
      {children}
    </SelectedTracksContext.Provider>
  );
}

export const useSelectedTracks = () => React.useContext(SelectedTracksContext);
