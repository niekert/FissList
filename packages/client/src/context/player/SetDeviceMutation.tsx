import * as React from 'react';
import gql from 'graphql-tag';
import {
  SetActiveDevice,
  SetActiveDeviceVariables,
} from './__generated__/SetActiveDevice';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import { PLAYER_QUERY } from './PlayerQuery';

export const TOGGLE_PLAY_STATE_MUTATION = gql`
  mutation SetActiveDevice($deviceId: String!) {
    setActiveDevice(deviceId: $deviceId)
  }
`;

class SetActiveDeviceMutation extends Mutation<
  SetActiveDevice,
  SetActiveDeviceVariables
> {}

export type SetActiveDeviceMutationFn = MutationFn<
  SetActiveDevice,
  SetActiveDeviceVariables
>;

interface IProps {
  children: (
    mutate: SetActiveDeviceMutationFn,
    result: MutationResult<SetActiveDevice>,
  ) => React.ReactNode;
}

export default function SetDeviceMutation({ children, ...props }: IProps) {
  return (
    <SetActiveDeviceMutation
      mutation={TOGGLE_PLAY_STATE_MUTATION}
      refetchQueries={[{ query: PLAYER_QUERY }]}
      {...props}
    >
      {children}
    </SetActiveDeviceMutation>
  );
}
