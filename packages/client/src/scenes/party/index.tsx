import * as React from 'react';
import PartyQuery from './PartyQuery';
import Spinner from 'components/Spinner';
import Page from 'components/Page';
import { Card } from 'components/Card';
import styled from 'styled-components';
import { Tabs, Tab } from 'components/Tabs';
import Playlist from 'components/Playlist';
import { Title } from 'components/Typography';
import Player from 'scenes/player';

const PlayerCard = styled(Card)`
  display: flex;
  position: sticky;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 0;
  top: 0;
  background: white;
`;

const PlayerWrapper = styled.div`
  padding: ${props => `${props.theme.spacing[2]} ${props.theme.spacing[2]} 0`};
`;

interface IProps {
  path?: string;
  partyId?: string;
}

enum PlayerTabs {
  Queue = 'queue',
  Browse = 'browse',
}

export default function Party(props: IProps) {
  const [activeTab, setActiveTab] = React.useState<PlayerTabs>(
    PlayerTabs.Queue,
  );
  React.useLayoutEffect(
    () => {
      window.scrollTo(0, 0);
    },
    [activeTab],
  );

  return (
    <PartyQuery
      variables={{
        partyId: props.partyId!,
      }}
    >
      {({ data, loading }) => (
        <Page>
          {(!data || !data.party) && <Spinner />}
          {data && data.party && (
            <>
              <Title as="h2">
                {activeTab === PlayerTabs.Queue ? data.party.name : 'Browse'}
              </Title>
              <PlayerCard>
                <PlayerWrapper>
                  <Player activeFeedUri={data.party.playlistId} />
                </PlayerWrapper>
                <Tabs activeTab={activeTab} onChange={setActiveTab}>
                  <Tab name={PlayerTabs.Queue}>Queue</Tab>
                  <Tab name={PlayerTabs.Browse}>Browse</Tab>
                </Tabs>
              </PlayerCard>
              {activeTab === PlayerTabs.Queue &&
                data &&
                data.party.playlist && <Playlist {...data.party.playlist} />}
            </>
          )}
        </Page>
      )}
    </PartyQuery>
  );
}
