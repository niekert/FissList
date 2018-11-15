import * as React from 'react';
import PartyQuery from './PartyQuery';
import Spinner from 'components/Spinner';
import Page from 'components/Page';
import { RouteComponentProps } from 'react-router';
import { Card } from 'components/Card';
import styled from 'styled-components';
import { Tabs, Tab } from 'components/Tabs';
import Playlist from 'components/Playlist';
import Player from 'scenes/player';
import PlayLists from 'scenes/playlists';

const PlayerCard = styled(Card)`
  display: flex;
  position: sticky;
  z-index: 1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin-bottom: 0;
  padding: 0;
  top: 0;
  flex-shrink: 0;
  background: white;
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`;

const PlayerWrapper = styled.div`
  padding: ${props => `${props.theme.spacing[2]} ${props.theme.spacing[2]} 0`};
`;

interface IProps extends RouteComponentProps<{ partyId: string }> {
  path?: string;
}

enum PlayerTabs {
  Queue = 'queue',
  Browse = 'browse',
}

export default function Party({ match }: IProps) {
  const [activeTab, setActiveTab] = React.useState<string>(PlayerTabs.Queue);
  React.useLayoutEffect(
    () => {
      window.scrollTo(0, 0);
    },
    [activeTab],
  );

  return (
    <PartyQuery
      variables={{
        partyId: match.params.partyId,
      }}
    >
      {({ data, loading }) => (
        <Page>
          {(!data || !data.party) && (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          )}
          {data && data.party && (
            <>
              <PlayerCard>
                <PlayerWrapper>
                  <Player activeFeedUri={data.party.playlistId} />
                </PlayerWrapper>
                <Tabs activeTab={activeTab} onChange={setActiveTab}>
                  <Tab name={PlayerTabs.Queue}>Queue</Tab>
                  <Tab name={PlayerTabs.Browse}>Browse</Tab>
                </Tabs>
              </PlayerCard>
              <ContentWrapper>
                {activeTab === PlayerTabs.Queue &&
                  data &&
                  data.party.playlist && <Playlist {...data.party.playlist} />}
                {activeTab === PlayerTabs.Browse && <PlayLists />}
              </ContentWrapper>
            </>
          )}
        </Page>
      )}
    </PartyQuery>
  );
}
