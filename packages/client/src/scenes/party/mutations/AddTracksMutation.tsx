import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import { AddTracks, AddTracksVariables } from './__generated__/AddTracks';

export const ADD_TRACK_MUTATION = gql`
  mutation AddTracks($partyId: String!, $trackIds: [String]!) {
    addTracks(partyId: $partyId, trackIds: $trackIds) {
      id
    }
  }
`;

class AddTracksMutation extends Mutation<AddTracks, AddTracksVariables> {}

interface Props {
  refetchQueries: any; // TODO: typedef?
  onCompleted: () => void;
  children: (
    mutate: MutationFn<AddTracks, AddTracksVariables>,
    result: MutationResult<AddTracks>,
  ) => React.ReactNode;
}

export default function AddTracksMutationComponent({
  children,
  ...props
}: Props) {
  return (
    <AddTracksMutation mutation={ADD_TRACK_MUTATION} {...props}>
      {children}
    </AddTracksMutation>
  );
}
