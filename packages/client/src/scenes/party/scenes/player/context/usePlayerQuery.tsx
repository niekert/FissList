import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { TrackInfo } from 'fragments/Track';
import { DeviceInfo } from 'fragments/Device';
import { ApolloQueryResult } from 'apollo-client';
import { Player } from './__generated__/Player';

export const PLAYER_QUERY = gql`
  query Player {
    player {
      isPlaying
      item {
        ...TrackInfo
      }
      device {
        ...DeviceInfo
      }
      devices {
        ...DeviceInfo
      }
    }
  }

  ${TrackInfo}
  ${DeviceInfo}
`;

export interface PlayerQueryResult extends ApolloQueryResult<Player> {
  refetch: () => void;
}

export function usePlayerQuery(): PlayerQueryResult {
  const player = useQuery<Player>(PLAYER_QUERY, {
    pollInterval: 3000,
  });

  return {
    data: player.data,
    errors: player.errors,
    loading: player.loading,
    stale: player.stale,
    refetch: player.refetch,
    networkStatus: player.networkStatus,
  };
}
