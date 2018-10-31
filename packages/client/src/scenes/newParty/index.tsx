import * as React from 'react';
import NewPartyMutation from './mutations/NewPartyMutation';
import NewPartyForm from './NewPartyForm';
import NewPartyCard from './NewPartyCard';
import { useInputField } from 'hooks';

function NewParty({ path }: { path?: string }) {
  const partyName = useInputField('');
  const [selectedPlaylistId, setSelectedPlaylist] = React.useState<string>('');

  return (
    <NewPartyMutation>
      {(mutate, { data, loading }) => {
        if (data && data.createParty) {
          return (
            <NewPartyCard
              partyId={data.createParty.id}
              name={data.createParty.name}
            />
          );
        }

        return (
          <NewPartyForm
            setSelectedPlaylist={setSelectedPlaylist}
            selectedPlaylistId={selectedPlaylistId}
            setName={partyName.onChange}
            name={partyName.value}
            isLoading={loading}
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();

              mutate({
                variables: {
                  name: partyName.value,
                  playlistId: selectedPlaylistId,
                },
              });
            }}
          />
        );
      }}
    </NewPartyMutation>
  );
}

export default NewParty;
