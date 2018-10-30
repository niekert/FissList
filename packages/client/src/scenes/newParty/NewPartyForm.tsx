import * as React from 'react';
import { Title, Text } from 'components/Typography';
import SelectPlaylist from 'scenes/selectPlaylist';
import posed, { PoseGroup } from 'react-pose';
import PartyForm from './PartyForm';
import { Button, Input, FormField } from 'components/Form';
import styled from 'styled-components';
import Spinner from 'components/Spinner';

const PosedCtaSection = posed.div({
  visible: { transform: 'translateY(0%)', opacity: 1 },
  hidden: { transform: 'translateY(100%)', opacity: 0 },
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

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

const Loading = styled(Spinner)`
  align-self: center;
`;

interface IProps {
  setSelectedPlaylist: (playlistId: string) => void;
  selectedPlaylistId: string;
  name: string;
  onSubmit: (e: React.SyntheticEvent) => void;
  setName: (e: React.SyntheticEvent) => void;
  isLoading: boolean;
}

function NewPartyForm({
  setSelectedPlaylist,
  selectedPlaylistId,
  setName,
  name,
  onSubmit,
  isLoading,
}: IProps) {
  const isValid = name.length > 0 && !!selectedPlaylistId;

  const selectPlaylist = React.useMemo(
    () => (
      <SelectPlaylist
        selectedPlaylistId={selectedPlaylistId}
        onClick={playlistId => setSelectedPlaylist(playlistId)}
      />
    ),
    [selectedPlaylistId],
  );

  return (
    <Wrapper>
      <Title>Create a new Party</Title>
      <Text textAlign="center">
        Here you can configure a new party for your friends to join
      </Text>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <PartyForm>
            <FormField label="Party name">
              <Input type="text" value={name} onChange={setName} />
            </FormField>

            <FormField
              label="Base playlist"
              marginBottom={0}
              subTitle="New songs are added to the front of the queue"
            >
              {selectPlaylist}
            </FormField>
          </PartyForm>
          <CtaSection pose={isValid ? 'visible' : 'hidden'}>
            <Cta type="button" onClick={onSubmit}>
              Start a new party
            </Cta>
          </CtaSection>
        </>
      )}
    </Wrapper>
  );
}

export default NewPartyForm;
