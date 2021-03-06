import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router';
import { TrackInfo } from 'fragments';
import styled, { css } from 'styled-components';
import {
  PreviouslyPlayedTracks,
  PreviouslyPlayedTracksVariables,
} from './__generated__/PreviouslyPlayedTracks';
import { TrackSelectList } from './TrackSelectList';
import { Button } from 'components/Form';

const PREVIOUSLY_PLAYED_TRACKS_QUERY = gql`
  query PreviouslyPlayedTracks($partyId: String!, $offset: Int, $limit: Int) {
    previousTracks(partyId: $partyId, offset: $offset, limit: $limit) {
      ...TrackInfo
    }
  }

  ${TrackInfo}
`;

const SectionHeader = styled.h3`
  margin: 0;
  line-height: 2;
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
`;

function History({ match }: RouteComponentProps<{ partyId: string }>) {
  const previousTracks = useQuery<
    PreviouslyPlayedTracks,
    PreviouslyPlayedTracksVariables
  >(PREVIOUSLY_PLAYED_TRACKS_QUERY, {
    variables: {
      partyId: match.params.partyId,
    },
    fetchPolicy: 'cache-first',
  });

  return (
    <>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <SectionHeader>Previously played</SectionHeader>
        <Button>Create playlist</Button>
      </div>
      <TrackSelectList tracks={previousTracks.data.previousTracks} />
    </>
  );
}

export default History;
