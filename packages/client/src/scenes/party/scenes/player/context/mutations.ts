import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import {
  SetActiveDevice,
  SetActiveDeviceVariables,
} from './__generated__/SetActiveDevice';
import { Playback as PlaybackType } from 'globalTypes';
import { Playback, PlaybackVariables } from './__generated__/Playback';
import { PLAYER_QUERY, Player } from './usePlayerQuery';

export const SET_ACTIVE_DEVICE_MUTATION = gql`
  mutation SetActiveDevice($deviceId: String!) {
    setActiveDevice(deviceId: $deviceId)
  }
`;

export const PLAYBACK_MUTATION = gql`
  mutation Playback($partyId: String!, $playback: Playback!) {
    playback(partyId: $partyId, playback: $playback)
  }
`;

export function useSetActiveDeviceMutation() {
  return useMutation<SetActiveDevice, SetActiveDeviceVariables>(
    SET_ACTIVE_DEVICE_MUTATION,
  );
}

function usePlaybackMutation() {
  return useMutation<Playback, PlaybackVariables>(PLAYBACK_MUTATION);
}

export function useSkipMutation() {
  const mutate = usePlaybackMutation();

  return (partyId: string) => {
    mutate({
      variables: {
        playback: PlaybackType.SKIP,
        partyId,
      },
      update(store) {
        const playerQuery = store.readQuery<Player>({ query: PLAYER_QUERY });
        if (!playerQuery || !playerQuery.player) {
          return;
        }

        store.writeQuery<Player>({
          query: PLAYER_QUERY,
          data: {
            player: {
              ...playerQuery.player,
              isPlaying: true,
            },
          },
        });
      },
    });
  };
}

export function usePlayPauseMutation() {
  const mutate = usePlaybackMutation();

  return (type: PlaybackType, partyId: string) => {
    return mutate({
      variables: {
        partyId,
        playback: type,
      },
      optimisticResponse: {
        playback: type,
      },
      update(store) {
        const playerQuery = store.readQuery<Player>({ query: PLAYER_QUERY });
        if (!playerQuery || !playerQuery.player) {
          return;
        }

        store.writeQuery<Player>({
          query: PLAYER_QUERY,
          data: {
            player: {
              ...playerQuery.player,
              isPlaying: type === PlaybackType.PLAY,
            },
          },
        });
      },
    });
  };
}
