import * as React from 'react';
import gql from 'graphql-tag';
import { Subscription } from 'react-apollo';
import {
  PartyTracksChangedSubscription,
  PartyTracksChangedSubscriptionVariables,
} from './__generated__/PartyTracksChangedSubscription';

const PARTY_CHANGES_SUBSCRIPTION = gql`
  subscription PartyTracksChangedSubscription($partyId: String!) {
    partyTracksChanged(partyId: $partyId)
  }
`;

class PartyTracksChangeSubscription extends Subscription<
  PartyTracksChangedSubscription,
  PartyTracksChangedSubscriptionVariables
> {}

interface ContextValue {
  markTrackSeen: (trackId: string) => void;
  changedTrackIds: string[];
}

export const Context = React.createContext<ContextValue>({
  // tslint:disable-next-line
  markTrackSeen: () => {},
  changedTrackIds: [],
});

enum Actions {
  ADD_CHANGED_TRACKS,
  MARK_SEEN,
}

function changedTracksReducer(state: string[], action): string[] {
  switch (action.type) {
    case Actions.ADD_CHANGED_TRACKS: {
      return [...state, ...action.payload];
    }
    case Actions.MARK_SEEN: {
      return state.filter(trackId => trackId !== action.payload.trackId);
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
  const [changedTrackIds, dispatch] = React.useReducer<string[], any>(
    changedTracksReducer,
    [],
  );
  const markTrackSeen = React.useCallback(trackId => {
    dispatch({
      type: Actions.MARK_SEEN,
      payload: {
        trackId,
      },
    });
  }, []);

  const context = React.useMemo(
    () => ({
      changedTrackIds,
      markTrackSeen,
    }),
    [changedTrackIds],
  );

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
