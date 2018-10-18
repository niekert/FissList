import gql from 'graphql-tag';
import { ReactNode } from 'react';

export const USERS_QUERY = gql`
  query users {
    allUsers {
      id
    }
  }
`;

export class CurrentUserQuery extends Query<CurrentUser> {}

export default function CurrentUserQueryComponent({
  children,
}: {
  children?: (currentUser: QueryResult<CurrentUser>) => ReactNode;
}) {
  return (
    <CurrentUserQuery
      query={CURRENT_USER_QUERY}
      errorPolicy="ignore"
      fetchPolicy="cache-and-network"
    >
      {children}
    </CurrentUserQuery>
  );
}
