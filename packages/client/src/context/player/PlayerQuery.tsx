import * as React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { TrackInfo } from 'fragments/Track';
import { Player } from './__generated__/Player';

export const PLAYER_QUERY = gql`
  query Player {
    player {
      isPlaying
      item {
        ...TrackInfo
      }
      devices {
        id
        name
        isRestricted
        type
      }
    }
  }

  ${TrackInfo}
`;

export class PlayerQuery extends Query<Player> {}

interface IProps {
  children: (me: QueryResult<Player>) => React.ReactNode;
}

export type PlayerQueryResult = QueryResult<Player>;
export type Player = Player;

export default function PlayerQueryComponent({ children }: IProps) {
  return (
    <PlayerQuery pollInterval={10000} query={PLAYER_QUERY}>
      {children}
    </PlayerQuery>
  );
}
