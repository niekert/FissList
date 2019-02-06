import * as React from 'react';
import gql from 'graphql-tag';
import { Subscription } from 'react-apollo';
import {
  PartyTracksChangedSubscription,
  PartyTracksChangedSubscriptionVariables,
  PartyTracksChangedSubscription_partyTracksChanged,
} from '../../../context/__generated__/PartyTracksChangedSubscription';
import { useQueuedTracks, usePartyQuery } from '../queries';

const PARTY_CHANGES_SUBSCRIPTION = gql`
  subscription PartyTracksChangedSubscription($partyId: String!) {
    partyTracksChanged(partyId: $partyId) {
      partyId
      addedTrackIds
      nextActiveTrackId
      deletedTrackIds
    }
  }
`;

class PartyTracksChangeSubscription extends Subscription<
  PartyTracksChangedSubscription,
  PartyTracksChangedSubscriptionVariables
> {}

interface State {
  addedTrackIds: string[];
  deletedTrackIds: string[];
  nextActiveTrackId: string | null;
}
interface ContextValue extends State {
  markTrackSeen: (trackIds: string | string[]) => void;
}

export const Context = React.createContext<ContextValue>({
  // tslint:disable-next-line
  markTrackSeen: () => {},
  addedTrackIds: [],
  deletedTrackIds: [],
  nextActiveTrackId: '',
});

enum Actions {
  ADD_CHANGED_TRACKS = 'add_changed',
  MARK_SEEN = 'mark_seen',
}

function changedTracksReducer(state: State, action): State {
  switch (action.type) {
    case Actions.ADD_CHANGED_TRACKS: {
      const payload = action.payload as PartyTracksChangedSubscription_partyTracksChanged;

      return {
        addedTrackIds: [
          ...state.addedTrackIds,
          ...(payload.addedTrackIds || []),
        ],
        deletedTrackIds: [
          ...state.deletedTrackIds,
          ...(payload.deletedTrackIds || []),
        ],
        nextActiveTrackId: payload.nextActiveTrackId,
      };
    }
    case Actions.MARK_SEEN: {
      return {
        ...state,
        addedTrackIds: state.addedTrackIds.filter(
          trackId => !action.payload.trackIds.has(trackId),
        ),
        deletedTrackIds: state.deletedTrackIds.filter(
          trackId => !action.payload.trackIds.has(trackId),
        ),
      };
    }
    default: {
      return state;
    }
  }
}

export function ChangedPartyTracksProvider({
  partyId,
  children,
}: {
  partyId: string;
  children: React.ReactNode;
}) {
  const queuedTracks = useQueuedTracks(partyId);
  const partyQuery = usePartyQuery(partyId);
  const [state, dispatch] = React.useReducer<typeof changedTracksReducer>(
    changedTracksReducer,
    {
      addedTrackIds: [],
      deletedTrackIds: [],
      nextActiveTrackId: null,
    },
  );
  const markTrackSeen = React.useCallback((trackIds: string | string[]) => {
    dispatch({
      type: Actions.MARK_SEEN,
      payload: {
        trackIds: new Set(Array.isArray(trackIds) ? trackIds : [trackIds]),
      },
    });
  }, []);
  const currentActiveTrack = React.useRef<string | null>(
    state.nextActiveTrackId,
  );

  const context = React.useMemo(
    () => ({
      ...state,
      markTrackSeen,
    }),
    [state],
  );

  React.useEffect(() => {
    if (state.deletedTrackIds.length > 0) {
      queuedTracks.updateQuery(previousQueryResult => ({
        queuedTracks: previousQueryResult.queuedTracks.filter(
          queuedTrack => !state.deletedTrackIds.includes(queuedTrack.trackId),
        ),
      }));

      markTrackSeen(state.deletedTrackIds);
    }
  }, [state.deletedTrackIds]);

  React.useEffect(() => {
    if (
      !state.nextActiveTrackId ||
      state.nextActiveTrackId === currentActiveTrack.current
    ) {
      // Do not do anything when the track id is the same as the current
      return;
    }

    if (state.nextActiveTrackId && queuedTracks.data.queuedTracks) {
      const nextActiveTrackIndex = queuedTracks.data.queuedTracks.findIndex(
        queuedTrack => queuedTrack.trackId === state.nextActiveTrackId,
      );

      if (nextActiveTrackIndex === -1) {
        console.error('Next track was not found in the play queue');
        return;
      }

      currentActiveTrack.current = state.nextActiveTrackId;
      const nextQueue = queuedTracks.data.queuedTracks.slice(
        nextActiveTrackIndex + 1,
      );
      const nextTrack = queuedTracks.data.queuedTracks[nextActiveTrackIndex];

      queuedTracks.updateQuery(() => ({
        queuedTracks: nextQueue,
      }));

      // Update the party to have the new track
      partyQuery.updateQuery(() => ({
        party: {
          ...partyQuery.data.party,
          activeTrack: {
            ...nextTrack.track,
          },
          activeTrackId: state.nextActiveTrackId!,
        },
      }));

      markTrackSeen(state.nextActiveTrackId);
    }
  }, [state.nextActiveTrackId]);

  return (
    <>
      <PartyTracksChangeSubscription
        shouldResubscribe={true}
        subscription={PARTY_CHANGES_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          dispatch({
            type: Actions.ADD_CHANGED_TRACKS,
            payload: subscriptionData.data!.partyTracksChanged,
          });
        }}
        variables={{ partyId }}
      />
      <Context.Provider value={context}>{children}</Context.Provider>
    </>
  );
}

export const useChangedTracks = () => React.useContext(Context);
