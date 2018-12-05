import * as React from 'react';
import { FormField, Input, Button } from 'components/Form';

export default function PartyNameForm() {
  return (
    <form>
      <FormField label="Party name">
        <Input type="Text" />
      </FormField>
      <Button type="submit">Save</Button>
    </form>
  );
}
