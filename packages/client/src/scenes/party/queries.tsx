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

export const GET_PARTY = gql`
  query GetPartyById($partyId: String!) {
    party(partyId: $partyId) {
      ...PartyInfo
    }
  }

  ${PartyInfo}
`;

const QUEUED_TRACK_DETAILS = gql`
  query QueuedTrackDetails($partyId: String!) {
    queuedTracks(partyId: $partyId) {
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
  return useQuery<QueuedTrackDetails, QueuedTrackDetailsVariables>(
    QUEUED_TRACK_DETAILS,
    {
      variables: {
        partyId,
      },
    },
  );
}

export function usePartyQuery(partyId: string) {
  return useQuery<GetPartyById, GetPartyByIdVariables>(GET_PARTY, {
    errorPolicy: 'all',
    // TODO: Enable suspense here
    suspend: false,
    variables: {
      partyId,
    },
  });
}
