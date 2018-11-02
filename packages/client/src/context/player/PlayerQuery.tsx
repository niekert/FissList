import * as React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { Player } from './__generated__/Player';

export const PLAYER_QUERY = gql`
  query Player {
    player {
      isPlaying
      devices {
        id
        name
        isRestricted
        type
      }
    }
  }
`;

export class PlayerQuery extends Query<Player> {}

interface IProps {
  children: (me: QueryResult<Player>) => React.ReactNode;
}

export type PlayerQueryResult = QueryResult<Player>;
export type Player = Player;

export default function PlayerQueryComponent({ children }: IProps) {
  return <PlayerQuery query={PLAYER_QUERY}>{children}</PlayerQuery>;
}
