import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import {
  TogglePlayState,
  TogglePlayStateVariables,
} from './__generated__/TogglePlayState';
import {
  SetActiveDevice,
  SetActiveDeviceVariables,
} from './__generated__/SetActiveDevice';

export const SET_ACTIVE_DEVICE_MUTATION = gql`
  mutation SetActiveDevice($deviceId: String!) {
    setActiveDevice(deviceId: $deviceId)
  }
`;

export const TOGGLE_PLAY_STATE_MUTATION = gql`
  mutation TogglePlayState(
    $type: String!
    $partyId: String
    $contextUri: String
    $offsetUri: String
  ) {
    togglePlayState(
      type: $type
      partyId: $partyId
      contextUri: $contextUri
      offsetUri: $offsetUri
    ) {
      __typename
      isPlaying
    }
  }
`;

export function useSetActiveDeviceMutation() {
  return useMutation<SetActiveDevice, SetActiveDeviceVariables>(
    SET_ACTIVE_DEVICE_MUTATION,
  );
}

export function useSetTogglePlayStateMutation() {
  return useMutation<TogglePlayState, TogglePlayStateVariables>(
    TOGGLE_PLAY_STATE_MUTATION,
  );
}
