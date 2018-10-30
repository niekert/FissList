import * as React from 'react';
import PartyForm from './PartyForm';
import Page from 'components/Page';
import { Title, Text } from 'components/Typography';
import NewPartyMutation from './mutations/NewPartyMutation';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components';
import SelectPlaylist from 'scenes/selectPlaylist';
import { Button, Input, FormField } from 'components/Form';
import { useInputField } from 'hooks';
import Spinner from 'components/Spinner';
import NewPartyCard from './NewPartyCard';

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

function NewParty({ path }: { path?: string }) {
  const partyName = useInputField('');
  const [selectedPlaylist, setSelectedPlaylist] = React.useState<string>('');
  const [hasError, setHasError] = React.useState(false);

  const onSubmit = React.useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!partyName) {
      setHasError(true);
      return;
    }
  }, []);

  const selectPlaylist = React.useMemo(
    () => (
      <SelectPlaylist
        selectedPlaylistId={selectedPlaylist}
        onClick={playlistId => setSelectedPlaylist(playlistId)}
      />
    ),
    [selectedPlaylist],
  );

  const isValid = partyName.value.length > 0 && !!selectedPlaylist;

  return (
    <NewPartyMutation>
      {(mutate, { data, loading }) => {
        return (
          <Wrapper>
            <Title>Create a new Party</Title>
            <Text textAlign="center">
              Here you can configure a new party for your friends to join
            </Text>

            {loading && <Loading />}

            {!loading &&
              data &&
              data.createParty && (
                <NewPartyCard
                  partyId={data.createParty.id}
                  name={data.createParty.name}
                />
              )}

            {!loading &&
              !data && (
                <>
                  <PartyForm>
                    <FormField label="Party name">
                      <Input type="text" {...partyName} />
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
                    <Cta
                      type="button"
                      onClick={(e: React.SyntheticEvent) => {
                        e.preventDefault();

                        if (isValid) {
                          mutate({
                            variables: {
                              name: partyName.value,
                              basePlaylistId: selectedPlaylist,
                            },
                          });
                        }
                      }}
                    >
                      Start a new party
                    </Cta>
                  </CtaSection>
                </>
              )}
          </Wrapper>
        );
      }}
    </NewPartyMutation>
  );
}

export default NewParty;
