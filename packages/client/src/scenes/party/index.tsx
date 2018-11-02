import * as React from 'react';
import PartyQuery from './PartyQuery';
import Spinner from 'components/Spinner';
import Page from 'components/Page';
import PartyPlaylist from './PartyPlaylist';
import { Title } from 'components/Typography';
import Player from 'scenes/player';

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
          {(!data || !data.party) && <Spinner />}
          {data &&
            data.party && (
              <>
                <Title as="h2">{data.party.name}</Title>
                <Player activeFeedUri={data.party.playlistId} />
                {data &&
                  data.party && (
                    <PartyPlaylist
                      {...data.party.playlist!}
                      isLoading={loading}
                    />
                  )}
              </>
            )}
        </Page>
      )}
    </PartyQuery>
  );
}
