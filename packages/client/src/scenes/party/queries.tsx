import gql from 'graphql-tag';
import { PartyInfo, TrackInfo } from 'fragments';
import { useQuery } from 'react-apollo-hooks';
import {
  GetPartyById,
  GetPartyByIdVariables,
} from './__generated__/GetPartyById';
import {
  QueuedTrackDetails,
  QueuedTrackDetailsVariables,
} from './__generated__/QueuedTrackDetails';

export { QueuedTrackDetails, GetPartyById, GetPartyByIdVariables };

export const PARTY_QUERY = gql`
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
  const query = useQuery<QueuedTrackDetails, QueuedTrackDetailsVariables>(
    QUEUED_TRACK_DETAILS,
    {
      pollInterval: 10000,
      variables: {
        partyId,
      },
    },
  );

  return query;
}

export function usePartyQuery(partyId: string) {
  return useQuery<GetPartyById, GetPartyByIdVariables>(PARTY_QUERY, {
    suspend: false,
    variables: {
      partyId,
    },
  });
}
