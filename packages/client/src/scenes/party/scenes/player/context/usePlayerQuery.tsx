import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { DeviceInfo } from 'fragments/Device';
import { ApolloQueryResult } from 'apollo-client';
import { Player } from './__generated__/Player';

export { Player };

export const PLAYER_QUERY = gql`
  query Player {
    player {
      isPlaying
      device {
        ...DeviceInfo
      }
      devices {
        ...DeviceInfo
      }
    }
  }

  ${DeviceInfo}
`;

export interface PlayerQueryResult extends ApolloQueryResult<Player> {
  refetch: () => void;
}

export function usePlayerQuery(): PlayerQueryResult {
  const player = useQuery<Player>(PLAYER_QUERY);

  return {
    data: player.data,
    errors: player.errors,
    loading: player.loading,
    stale: player.stale,
    refetch: player.refetch,
    networkStatus: player.networkStatus,
  };
}
