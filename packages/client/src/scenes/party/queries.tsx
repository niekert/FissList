import * as React from 'react';
import gql from 'graphql-tag';
import { PartyInfo, TrackInfo } from 'fragments';
import { useQuery, useApolloClient } from 'react-apollo-hooks';
import {
  GetPartyById,
  GetPartyByIdVariables,
} from './__generated__/GetPartyById';
import {
  QueuedTrackDetails,
  QueuedTrackDetailsVariables,
} from './__generated__/QueuedTrackDetails';
import { useChangedTracks } from 'context/ChangedPartyTracksContext';

export { QueuedTrackDetails };

export const GET_PARTY = gql`
  query GetPartyById($partyId: String!) {
    party(partyId: $partyId) {
      ...PartyInfo
    }
  }

  ${PartyInfo}
`;

export const QUEUED_TRACK_DETAILS = gql`
  query QueuedTrackDetails($partyId: String!) {
    queuedTracks(partyId: $partyId) {
      id
      trackId
      track {
        ...TrackInfo
      }
      userVotes
    }
  }

  ${TrackInfo}
`;

export function useQueuedTracks(partyId: string) {
  const {
    deletedTrackIds,
    nextActiveTrackId,
    markTrackSeen,
  } = useChangedTracks();

  const currentActiveTrack = React.useRef<string | null>(nextActiveTrackId);
  const partyQuery = usePartyQuery(partyId);
  const apolloClient = useApolloClient();

  const query = useQuery<QueuedTrackDetails, QueuedTrackDetailsVariables>(
    QUEUED_TRACK_DETAILS,
    {
      pollInterval: 10000,
      variables: {
        partyId,
      },
    },
  );

  React.useEffect(() => {
    if (deletedTrackIds.length > 0) {
      query.updateQuery(previousQueryResult => ({
        queuedTracks: previousQueryResult.queuedTracks.filter(
          queuedTrack => !deletedTrackIds.includes(queuedTrack.trackId),
        ),
      }));

      markTrackSeen(deletedTrackIds);
    }
  }, [deletedTrackIds]);

  React.useEffect(() => {
    if (nextActiveTrackId === currentActiveTrack.current) {
      // Do not do anything when the track id is the same as the current
      return;
    }

    if (nextActiveTrackId && query.data.queuedTracks) {
      const nextActiveTrackIndex = query.data.queuedTracks.findIndex(
        queuedTrack => queuedTrack.trackId === nextActiveTrackId,
      );

      if (nextActiveTrackIndex === -1) {
        console.error('Next track was not found in the play queue');
        return;
      }

      currentActiveTrack.current = nextActiveTrackId;
      const nextQueue = query.data.queuedTracks.slice(nextActiveTrackIndex + 1);
      const nextTrack = query.data.queuedTracks[nextActiveTrackIndex];

      query.updateQuery(() => ({
        queuedTracks: nextQueue,
      }));

      // Update the party to have the new track
      partyQuery.updateQuery(() => ({
        party: {
          ...partyQuery.data.party,
          activeTrack: {
            ...nextTrack.track,
          },
          activeTrackId: nextActiveTrackId,
        },
      }));

      markTrackSeen(nextActiveTrackId);
    }
  }, [nextActiveTrackId]);

  return query;
}

export function usePartyQuery(partyId: string) {
  return useQuery<GetPartyById, GetPartyByIdVariables>(GET_PARTY, {
    errorPolicy: 'all',
    variables: {
      partyId,
    },
  });
}
