import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import {
  SetActiveDevice,
  SetActiveDeviceVariables,
} from './__generated__/SetActiveDevice';
import { Playback, PlaybackVariables } from './__generated__/Playback';

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

export function usePlaybackMutation() {
  return useMutation<Playback, PlaybackVariables>(PLAYBACK_MUTATION);
}
