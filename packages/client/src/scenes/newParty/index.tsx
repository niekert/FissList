import * as React from 'react';
import { useNewParty } from './mutations/useNewParty';
import NewPartyForm from './NewPartyForm';
import NewPartyCard from './NewPartyCard';
import { useInputField } from 'hooks';

function NewParty({ path }: { path?: string }) {
  const partyName = useInputField('');
  const { mutate, isLoading, data } = useNewParty();
  const [selectedPlaylistId, setSelectedPlaylist] = React.useState<string>('');

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
      isLoading={isLoading}
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
}

export default NewParty;
