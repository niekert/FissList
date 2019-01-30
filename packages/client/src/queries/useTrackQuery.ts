import gql from 'graphql-tag';
import { TrackInfo } from 'fragments/Track';
import { Track, TrackVariables } from './__generated__/Track';
import { useQuery } from 'react-apollo-hooks';

const TRACK_QUERY = gql`
  query Track($trackId: String!) {
    track(trackId: $trackId) {
      ...TrackInfo
    }
  }

  ${TrackInfo}
`;

export function useTrackQuery(trackId) {
  return useQuery<Track, TrackVariables>(TRACK_QUERY, {
    variables: { trackId },
    suspend: false,
  });
}
