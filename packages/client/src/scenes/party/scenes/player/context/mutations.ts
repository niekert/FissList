import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import {
  SetActiveDevice,
  SetActiveDeviceVariables,
} from './__generated__/SetActiveDevice';
import { Playback, PlaybackVariables } from './__generated__/Playback';
import { PLAYER_QUERY, Player } from './usePlayerQuery';
import { QUEUED_TRACK_DETAILS, QueuedTrackDetails } from 'scenes/party/queries';

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

export function usePlaybackMutation(partyId: string) {
  return useMutation<Playback, PlaybackVariables>(PLAYBACK_MUTATION, {
    update(store, { data, context }) {
      if (data && data.playback) {
        const nextTrackId = data.playback;

        const player = store.readQuery<Player>({ query: PLAYER_QUERY });
        const queueQuery = store.readQuery<QueuedTrackDetails>({
          query: QUEUED_TRACK_DETAILS,
          variables: {
            partyId,
          },
        });

        if (player && player.player && queueQuery) {
          const [firstInQueue, ...nextInQueue] = queueQuery.queuedTracks;

          if (firstInQueue.track.id === nextTrackId) {
            store.writeQuery<Player>({
              query: PLAYER_QUERY,
              data: {
                player: {
                  ...player.player,
                  item: firstInQueue.track,
                },
              },
            });
            store.writeQuery<QueuedTrackDetails>({
              query: QUEUED_TRACK_DETAILS,
              variables: {
                partyId,
              },
              data: {
                queuedTracks: nextInQueue,
              },
            });
          }
        }
      }
    },
  });
}
