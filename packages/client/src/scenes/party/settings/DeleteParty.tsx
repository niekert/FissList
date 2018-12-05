import * as React from 'react';
import gql from 'graphql-tag';
import { withRouter, RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { Button } from 'components/Form';
import { FormField } from 'components/Form';
import { useStateMutation } from 'hooks';
import { GET_ME } from 'queries/GetMe';
import { DeleteParty, DeletePartyVariables } from './__generated__/DeleteParty';

const DeleteButton = styled(Button)`
  align-self: flex-start;
`;

const DELETE_PARTY = gql`
  mutation DeleteParty($partyId: String!) {
    deleteParty(partyId: $partyId)
  }
`;

interface Props extends RouteComponentProps {
  partyId: string;
}

function DeletePartyForm({ history, partyId }: Props) {
  const { mutate, isLoading, isSuccess } = useStateMutation<
    DeleteParty,
    DeletePartyVariables
  >(DELETE_PARTY);
  React.useEffect(
    () => {
      if (isSuccess) {
        history.replace('/');
      }
    },
    [isSuccess],
  );

  const onClick = () => {
    mutate({
      refetchQueries: [{ query: GET_ME }],
      variables: {
        partyId,
      },
    });
  };

  return (
    <FormField label="Party actions">
      <DeleteButton
        isLoading={isLoading}
        buttonType="destructive"
        onClick={onClick}
        type="button"
      >
        Delete party
      </DeleteButton>
    </FormField>
  );
}

export default withRouter(DeletePartyForm);
