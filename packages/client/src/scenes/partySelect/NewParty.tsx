import * as React from 'react';
import PartyForm from './PartyForm';
import gql from 'graphql-tag';
import { Title, Text } from 'components/Typography';
import { graphql, ChildMutateProps } from 'react-apollo';
import styled from 'styled-components';
import SelectPlaylist from 'scenes/selectPlaylist';
import { Button, Input, FormField } from 'components/Form';
import { useInputField } from 'hooks';
import { CardTitle } from 'components/Card';

const NEW_PARTY_QUERY = gql`
  mutation NewParty($name: String!) {
    createParty(name: $name) {
      id
      name
    }
  }
`;

type Response = {};

type Variables = {
  name: string;
};

type IProps = ChildMutateProps<{ onBack: () => void }, Response, Variables>;

const Cta = styled(Button)`
  align-self: flex-start;
  margin-top: 16px;
`;

function NewParty({ onBack, mutate }: IProps) {
  const partyName = useInputField('');
  const [selectedPlaylist, setSelectedPlaylist] = React.useState<string>('');

  const [hasError, setHasError] = React.useState(false);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    debugger;

    if (!partyName) {
      setHasError(true);
      return;
    }

    console.log('submitting form');
  };

  return (
    <>
      <Title>Create a new Party</Title>
      <Text textAlign="center">
        Here you can configure a new party for your friends to join
      </Text>
      <PartyForm onBack={onBack} onSubmit={onSubmit}>
        <FormField label="Party name">
          <Input type="text" {...partyName} />
        </FormField>

        <FormField label="Base playlist">
          <SelectPlaylist
            selectedPlaylistId={selectedPlaylist}
            onClick={playListId => setSelectedPlaylist(playListId)}
          />
        </FormField>

        <label>Party Options</label>
        <Cta>Start a new party</Cta>
      </PartyForm>
    </>
  );
}

// const withMutation = graphql<{}, Response, Variables>(NEW_PARTY_QUERY);

export default NewParty;
