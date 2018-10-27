import * as React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { ReactNode } from 'react';
import { AllUsers } from './__generated__/AllUsers';

export const USERS_QUERY = gql`
  query AllUsers {
    allUsers {
      id
    }
  }
`;

export class CurrentUserQuery extends Query<AllUsers> {}

export default function CurrentUserQueryComponent({
  children,
}: {
  children: (currentUser: QueryResult<AllUsers>) => ReactNode;
}) {
  return (
    <CurrentUserQuery
      query={USERS_QUERY}
      errorPolicy="ignore"
      fetchPolicy="cache-and-network"
    >
      {children}
    </CurrentUserQuery>
  );
}
