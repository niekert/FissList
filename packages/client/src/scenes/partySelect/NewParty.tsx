import * as React from 'react';
import PartyForm from './PartyForm';
import gql from 'graphql-tag';
import { Title, Text } from 'components/Typography';
import styled from 'styled-components';
import SelectPlaylist from 'scenes/selectPlaylist';
import { Button, Input, FormField } from 'components/Form';
import { useInputField } from 'hooks';

const NEW_PARTY_QUERY = gql`
  mutation NewParty($name: String!) {
    createParty(name: $name) {
      id
      name
    }
  }
`;

const CtaSection = styled.div`
  height: 75px;
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  width: 100%;
  box-shadow: rgba(200, 223, 245, 0.5) 0px -8px 16px 0px;
`;
const Cta = styled(Button)`
  align-self: center;
`;

function NewParty() {
  const partyName = useInputField('');
  const [selectedPlaylist, setSelectedPlaylist] = React.useState<string>('');

  const [hasError, setHasError] = React.useState(false);

  console.log('selected', selectedPlaylist);
  const isValid = partyName.value.length > 0 && !!selectedPlaylist;

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

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
      <PartyForm onSubmit={onSubmit}>
        <FormField label="Party name">
          <Input type="text" {...partyName} />
        </FormField>

        <FormField label="Creation type">
          <Input type="text" {...partyName} />
        </FormField>

        <FormField
          label="Base playlist"
          subTitle="New songs are added to the front of the queue"
        >
          <SelectPlaylist
            selectedPlaylistId={selectedPlaylist}
            onClick={playListId => {
              console.log('selecting playlist', playListId);
              setSelectedPlaylist(playListId);
            }}
          />
        </FormField>
      </PartyForm>
      {isValid && (
        <CtaSection>
          <Cta>Start a new party</Cta>
        </CtaSection>
      )}
    </>
  );
}

export default NewParty;
