import * as React from 'react';
import gql from 'graphql-tag';
import posed, { PoseGroup } from 'react-pose';
import styled, { css } from 'styled-components';
import { FormField, Input, Button } from 'components/Form';
import { PartyInfo } from 'fragments/Party';
import { useInputField, useStateMutation } from 'hooks';
import {
  UpdatePartyName,
  UpdatePartyNameVariables,
} from './__generated__/UpdatePartyName';

interface Props {
  partyId: string;
  partyName: string;
}

const PosedSuccessMessage = posed.div({
  exit: {
    transform: 'translateX(-16px)',
    opacity: 0,
  },
  enter: {
    transform: 'translateX(0px)',
    opacity: 1,
  },
});

const SuccessMessage = styled(PosedSuccessMessage)`
  margin-left: ${props => props.theme.spacing[2]};
  font-weight: 600;
  color: ${props => props.theme.colors.success};
`;

export default function PartyNameForm({ partyId, partyName }: Props) {
  const name = useInputField(partyName);
  const { isLoading, mutate, isSuccess, clearSuccess } = useStateMutation<
    UpdatePartyName,
    UpdatePartyNameVariables
  >(gql`
    mutation UpdatePartyName($partyId: String!, $name: String!) {
      updatePartyName(partyId: $partyId, name: $name) {
        ...PartyInfo
      }
    }

    ${PartyInfo}
  `);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name.value) {
      return;
    }

    mutate({
      partyId,
      name: name.value,
    });
  };

  React.useEffect(
    () => {
      if (isSuccess) {
        const timeout = setTimeout(clearSuccess, 3000);
        return () => clearTimeout(timeout);
      }

      return;
    },
    [isSuccess],
  );

  return (
    <form onSubmit={onSubmit}>
      <FormField label="Party name">
        <Input type="Text" {...name} disabled={isLoading || isSuccess} />
      </FormField>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Button type="submit" isLoading={isLoading}>
          Save
        </Button>

        <PoseGroup>
          {isSuccess && (
            <SuccessMessage key="successMessage">Updated!</SuccessMessage>
          )}
        </PoseGroup>
      </div>
    </form>
  );
}
