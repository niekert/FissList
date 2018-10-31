import * as React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { GetMe } from './__generated__/GetMe';

export const GET_ME = gql`
  query GetMe {
    me {
      id
      displayName
      email
      href
      images {
        url
      }
    }
  }
`;

export class GetMeQuery extends Query<GetMe> {}

interface IProps {
  children: (me: QueryResult<GetMe>) => React.ReactNode;
}

export type QueryResult = QueryResult<GetMe>;

export default function GetMeQueryComponent({ children }: IProps) {
  return (
    <GetMeQuery
      query={GET_ME}
      errorPolicy="ignore"
      fetchPolicy="cache-and-network"
    >
      {children}
    </GetMeQuery>
  );
}
