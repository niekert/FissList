import * as React from 'react';
import { usePartyQuery } from './queries';
import Spinner from 'components/Spinner';
import { SelectedTracksContainer } from 'context/SelectedTracks';
import UnreadBadge from 'components/UnreadBadge';
import Page from 'components/Page';
import { Location } from 'history';
import { RouteComponentProps } from 'react-router';
import { match as Match, Route, Switch } from 'react-router-dom';
import { Card } from 'components/Card';
import styled, { css } from 'styled-components';
import { ChangedPartyTracksProvider } from 'scenes/party/context/ChangedPartyTracksContext';
import { Tabs, Tab } from 'components/Tabs';
import PartySubscription from './PartyChangesSubscription';
import AddSelectedTracks from './AddSelectedTracks';
import { PlayerContainer } from './scenes/player/context';
import { PartyContext } from './context';
import Player from './scenes/player';
import JoinParty from './JoinParty';
import { SettingsIcon, HistoryIcon } from 'icons';
import PartySettings from './settings';
import TracksQueue from './TracksQueue';
import MemberActiveTrack from './MemberActiveTrack';
import { Permissions } from 'globalTypes';
import NotFound from 'components/NotFound';

export { usePartyContext } from './context';
export { PARTY_QUERY } from './queries';

const AsyncBrowse = React.lazy(() =>
  import('./scenes/browse').then(module => ({ default: module.Browse })),
);
const AsyncHistory = React.lazy(() =>
  import('./scenes/browse').then(module => ({ default: module.History })),
);

// FIXME: Remove this ugly hardcode
const PLAYER_HEIGHT_PX = 0;

const StickyTop = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 10;
  background: ${props => props.theme.colors.primary};
`;

const TabsCard = styled(Card)`
  display: flex;
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
  height: 100vh;
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

const SettingsTabIcon = styled(SettingsIcon)`
  width: 20px;
  height: 20px;
`;

interface IProps extends RouteComponentProps<{ partyId: string }> {
  path?: string;
}

enum PlayerTabs {
  Queue = 'queue',
  Browse = 'browse',
  Settings = 'settings',
  History = 'history',
}

// TODO: this is super hacky and ugly, lol
const getActivetab = (match: Match, location: Location) => {
  const relativePath = location.pathname.replace(match.url, '');

  if (relativePath === '') {
    return PlayerTabs.Queue;
  }

  if (relativePath.includes('/browse')) {
    return PlayerTabs.Browse;
  }

  if (relativePath.includes('/settings')) {
    return PlayerTabs.Settings;
  }

  if (relativePath.includes('/history')) {
    return PlayerTabs.History;
  }

  return PlayerTabs.Queue;
};

export default function Party({ match, location, history }: IProps) {
  const { data, errors } = usePartyQuery(match.params.partyId);

  const onTabChange = tab => {
    if (tab === PlayerTabs.Queue) {
      history.replace(match.url);
    }

    history.replace(`${match.url}/${tab}`);
  };

  const activeTab = getActivetab(match, location);
  React.useLayoutEffect(() => {
    // TODO: This 140 is hacky af, need to get player height or something?
    window.scrollTo(0, Math.min(window.scrollY, PLAYER_HEIGHT_PX));
  }, [activeTab]);

  if (errors) {
    return <NotFound />;
  }

  if (!data || !data.party) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );
  }

  if ([Permissions.NONE, Permissions.PENDING].includes(data.party.permission)) {
    return (
      <>
        <PartySubscription partyId={match.params.partyId} />
        <JoinParty
          partyId={data.party.id}
          partyName={data.party.name}
          permission={data.party.permission}
        />
      </>
    );
  }

  return (
    <ChangedPartyTracksProvider partyId={match.params.partyId}>
      <PartyContext.Provider value={data.party}>
        <PartySubscription partyId={match.params.partyId} />
        <Page>
          {data && data.party && (
            <SelectedTracksContainer>
              <StickyTop>
                {data.party.permission === Permissions.ADMIN ? (
                  <PlayerContainer>
                    <Player partyId={data.party.id} />
                  </PlayerContainer>
                ) : (
                  data.party.activeTrackId && (
                    <MemberActiveTrack
                      trackId={data.party.activeTrackId}
                      partyId={data.party.id}
                    />
                  )
                )}
                <TabsCard>
                  <Tabs activeTab={activeTab} onChange={onTabChange}>
                    <Tab name={PlayerTabs.Queue}>Queue</Tab>
                    <Tab name={PlayerTabs.Browse}>Browse</Tab>
                    <Tab
                      css={css`
                        flex: 0;
                        flex-basis: 50px;
                      `}
                      name={PlayerTabs.History}
                    >
                      <HistoryIcon
                        css={css`
                          width: 22px;
                          height: 22px;
                        `}
                      />
                    </Tab>
                    {data.party.permission === Permissions.ADMIN && (
                      <Tab
                        name={PlayerTabs.Settings}
                        css={css`
                          flex: 0;
                          flex-basis: 50px;
                        `}
                      >
                        <SettingsTabIcon />
                        {data.party.requestedUserIds &&
                          data.party.requestedUserIds.length > 0 && (
                            <UnreadBadge
                              css={css`
                                position: absolute;
                                top: 2px;
                                right: 8px;
                              `}
                              count={data.party.requestedUserIds.length}
                            />
                          )}
                      </Tab>
                    )}
                  </Tabs>
                </TabsCard>
              </StickyTop>
              <ContentWrapper>
                <React.Suspense fallback={<Spinner />}>
                  <Switch>
                    <Route
                      path={`${match.path}/browse`}
                      component={AsyncBrowse}
                    />
                    <Route
                      path={`${match.path}/history`}
                      component={AsyncHistory}
                    />
                    {data.party.permission === Permissions.ADMIN && (
                      <Route
                        path={`${match.path}/settings`}
                        render={props => (
                          <PartySettings
                            {...props}
                            requestedUserCount={
                              data.party.requestedUserIds
                                ? data.party.requestedUserIds.length
                                : 0
                            }
                            partyName={data.party.name}
                          />
                        )}
                      />
                    )}
                    <Route
                      render={() => (
                        <TracksQueue partyId={match.params.partyId} />
                      )}
                    />
                  </Switch>
                </React.Suspense>
              </ContentWrapper>
              <AddSelectedTracks partyId={data.party.id} />
            </SelectedTracksContainer>
          )}
        </Page>
      </PartyContext.Provider>
    </ChangedPartyTracksProvider>
  );
}
