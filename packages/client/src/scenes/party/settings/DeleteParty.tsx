import * as React from 'react';
import styled from 'styled-components';
import { Button } from 'components/Form';
import { FormField } from 'components/Form';

const DeleteButton = styled(Button)`
  align-self: flex-start;
`;

export default function DeleteParty() {
  return (
    <FormField label="Party actions">
      <DeleteButton buttonType="destructive">Delete party</DeleteButton>
    </FormField>
  );
}
