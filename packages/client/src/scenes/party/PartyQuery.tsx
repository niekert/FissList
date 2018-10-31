import * as React from 'react';
import gql from 'graphql-tag';
import { TrackInfo } from 'fragments/Track';
import { Query, QueryResult } from 'react-apollo';
import { GetParty, GetPartyVariables } from './__generated__/GetParty';

export const GET_PARTY = gql`
  query GetParty($partyId: String!) {
    party(partyId: $partyId) {
      id
      playlistId
      playlist {
        id
        tracks {
          href
          total
          items {
            addedAt
            track {
              ...TrackInfo
            }
          }
        }
      }
    }
  }

  ${TrackInfo}
`;

export class GetPartyQuery extends Query<GetParty, GetPartyVariables> {}

export type QueryResult = QueryResult<GetParty>;

interface IProps {
  children: (party: QueryResult<GetParty>) => React.ReactNode;
  variables: GetPartyVariables;
}

export default function GetPartyQueryComponent({
  children,
  variables,
}: IProps) {
  return (
    <GetPartyQuery
      query={GET_PARTY}
      errorPolicy="ignore"
      fetchPolicy="cache-and-network"
      variables={variables}
    >
      {children}
    </GetPartyQuery>
  );
}
