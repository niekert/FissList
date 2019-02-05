import * as React from 'react';
import { MAX_TRACKS_TO_REQUEST } from 'app-constants';

enum Actions {
  TOGGLE_TRACK,
  COMMIT_TRACKS,
  CLEAR_WARNINGS,
  CLEAR_SELECTED_TRACKS,
  MARK_TRACK_SEEN,
}

export interface State {
  selectedTracks: string[];
  commitSuccess: boolean;
  isOverLimit: boolean;
}
export type Reducer = (s: State, a: any) => State;

export interface Context extends State {
  toggleTrack: (trackId) => void;
  commitTracks: () => void;
  clearSelectedTracks: () => void;
  clearWarnings: () => void;
}

const initialState: State = {
  selectedTracks: [],
  commitSuccess: false,
  isOverLimit: false,
};

function selectedTracksReducer(state: State, action): State {
  switch (action.type) {
    case Actions.TOGGLE_TRACK: {
      const nextSelectedTracks = state.selectedTracks.includes(action.payload)
        ? state.selectedTracks.filter(trackId => trackId !== action.payload)
        : [...state.selectedTracks, action.payload];

      return {
        ...state,
        selectedTracks: nextSelectedTracks.slice(0, MAX_TRACKS_TO_REQUEST),
        isOverLimit: nextSelectedTracks.length > MAX_TRACKS_TO_REQUEST,
      };
    }

    case Actions.COMMIT_TRACKS: {
      return {
        ...state,
        selectedTracks: [],
        commitSuccess: true,
      };
    }
    case Actions.CLEAR_WARNINGS: {
      return {
        ...state,
        isOverLimit: false,
        commitSuccess: false,
      };
    }
    case Actions.CLEAR_SELECTED_TRACKS: {
      return {
        ...state,
        selectedTracks: [],
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
  clearWarnings: noProvider,
  isOverLimit: false,
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
    if (state.commitSuccess || state.isOverLimit) {
      const timeout = setTimeout(
        () =>
          dispatch({
            type: Actions.CLEAR_WARNINGS,
          }),
        2000,
      );

      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [state.commitSuccess, state.isOverLimit]);

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

  const clearWarnings = React.useCallback(() => {
    dispatch({ type: Actions.CLEAR_WARNINGS });
  }, []);

  const context = React.useMemo<Context>(
    () => ({
      ...state,
      toggleTrack,
      commitTracks,
      clearSelectedTracks,
      clearWarnings,
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
