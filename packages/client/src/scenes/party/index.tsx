import * as React from 'react';
import PartyQuery from './PartyQuery';
import Spinner from 'components/Spinner';
import PartyIdContext from 'context/PartyIdContext';
import { SelectedTracksContainer } from 'context/SelectedTracks';
import Page from 'components/Page';
import { Location } from 'history';
import {
  RouteComponentProps,
  match as Match,
  Switch,
  Route,
} from 'react-router';
import { Card } from 'components/Card';
import styled from 'styled-components';
import { ChangedPartyTracksProvider } from 'context/ChangedPartyTracksContext';
import { Tabs, Tab } from 'components/Tabs';
import PartySubscription from './PartyChangesSubscription';
import AddSelectedTracks from './AddSelectedTracks';
import { PlayerContainer } from 'context/player';
import Player from 'scenes/player';
import PlayLists from 'scenes/playlists';
import PartyPlaylist from './PartyPlaylist';

const TabsCard = styled(Card)`
  display: flex;
  position: sticky;
  z-index: 5;
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
  flex: 1;
  display: flex;
  min-height: 100vh;
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

const getActivetab = (match: Match, location: Location) => {
  const relativePath = location.pathname.replace(match.url, '');

  if (relativePath === '') {
    return PlayerTabs.Queue;
  }

  if (relativePath.includes('/browse')) {
    return PlayerTabs.Browse;
  }

  return PlayerTabs.Queue;
};

export default function Party({ match, location, history }: IProps) {
  const onTabChange = tab => {
    if (tab === PlayerTabs.Queue) {
      history.replace(match.url);
    }

    if (tab === PlayerTabs.Browse) {
      history.replace(`${match.url}/browse`);
    }
  };

  const activeTab = getActivetab(match, location);
  React.useMutationEffect(
    () => {
      // TODO: This 140 is hacky af, need to get player height or something?
      window.scrollTo(0, Math.min(window.scrollY, 140));
    },
    [activeTab],
  );

  return (
    <ChangedPartyTracksProvider partyId={match.params.partyId}>
      <PartyIdContext.Provider value={match.params.partyId}>
        <PartySubscription partyId={match.params.partyId} />
        <PlayerContainer>
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
                  <SelectedTracksContainer>
                    <PlayerWrapper>
                      <Player
                        activeFeedUri={data.party.playlistId}
                        partyId={data.party.id}
                      />
                    </PlayerWrapper>
                    <TabsCard>
                      <Tabs activeTab={activeTab} onChange={onTabChange}>
                        <Tab name={PlayerTabs.Queue}>Queue</Tab>
                        <Tab name={PlayerTabs.Browse}>Browse</Tab>
                      </Tabs>
                    </TabsCard>
                    <ContentWrapper>
                      <Switch>
                        <Route
                          path={`${match.path}/browse`}
                          component={PlayLists}
                        />
                        <Route
                          render={() => (
                            <PartyPlaylist
                              partyId={data.party.id}
                              {...data.party.playlist}
                              activeTrackIndex={
                                data.party.activeTrackIndex || undefined
                              }
                            />
                          )}
                        />
                      </Switch>
                    </ContentWrapper>
                    <AddSelectedTracks partyId={data.party.id} />
                  </SelectedTracksContainer>
                )}
              </Page>
            )}
          </PartyQuery>
        </PlayerContainer>
      </PartyIdContext.Provider>
    </ChangedPartyTracksProvider>
  );
}
