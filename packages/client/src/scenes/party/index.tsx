import * as React from 'react';
import PartyQuery from './PartyQuery';
import Spinner from 'components/Spinner';
import Page from 'components/Page';
import PartyPlaylist from './PartyPlaylist';
import { Title } from 'components/Typography';

interface IProps {
  path?: string;
  partyId?: string;
}

export default function Party(props: IProps) {
  return (
    <PartyQuery
      variables={{
        partyId: props.partyId!,
      }}
    >
      {({ data, loading }) => (
        <Page>
          <Title>Party</Title>
          {data &&
            data.party && (
              <PartyPlaylist {...data.party.playlist!} isLoading={loading} />
            )}
          {loading && <Spinner />}
        </Page>
      )}
    </PartyQuery>
  );
}
