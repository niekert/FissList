import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router';
import { TrackInfo } from 'fragments';
import {
  PreviouslyPlayedTracks,
  PreviouslyPlayedTracksVariables,
} from './__generated__/PreviouslyPlayedTracks';
import { TrackSelectList } from './TrackSelectList';

const PREVIOUSLY_PLAYED_TRACKS_QUERY = gql`
  query PreviouslyPlayedTracks($partyId: String!, $offset: Int, $limit: Int) {
    previousTracks(partyId: $partyId, offset: $offset, limit: $limit) {
      ...TrackInfo
    }
  }

  ${TrackInfo}
`;

function History({ match }: RouteComponentProps<{ partyId: string }>) {
  const previousTracks = useQuery<
    PreviouslyPlayedTracks,
    PreviouslyPlayedTracksVariables
  >(PREVIOUSLY_PLAYED_TRACKS_QUERY, {
    variables: {
      partyId: match.params.partyId,
    },
  });

  return <TrackSelectList tracks={previousTracks.data.previousTracks} />;
}

export default History;
