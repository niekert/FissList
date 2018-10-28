import * as React from 'react';
import PartyForm from './PartyForm';
import gql from 'graphql-tag';
import { Title, Text } from 'components/Typography';
import posed, { PoseGroup } from 'react-pose';
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

const PosedCtaSection = posed.div({
  visible: { transform: 'translateY(0%)', opacity: 1 },
  hidden: { transform: 'translateY(100%)', opacity: 0 },
});

const CtaSection = styled(PosedCtaSection)`
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

  const isValid = partyName.value.length > 0 && !!selectedPlaylist;

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!partyName) {
      setHasError(true);
      return;
    }
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

        <FormField
          label="Base playlist"
          marginBottom={0}
          subTitle="New songs are added to the front of the queue"
        >
          <SelectPlaylist
            selectedPlaylistId={selectedPlaylist}
            onClick={playListId => {
              setSelectedPlaylist(playListId);
            }}
          />
        </FormField>
      </PartyForm>
      <CtaSection pose={isValid ? 'visible' : 'hidden'}>
        <Cta>Start a new party</Cta>
      </CtaSection>
    </>
  );
}

export default NewParty;
