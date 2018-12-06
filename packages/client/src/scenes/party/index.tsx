import * as React from 'react';

import { usePartyQuery } from './usePartyQuery';
import Spinner from 'components/Spinner';
import PartyIdContext from 'context/PartyIdContext';
import { SelectedTracksContainer } from 'context/SelectedTracks';
import UnreadBadge from 'components/UnreadBadge';
import Page from 'components/Page';
import { Location } from 'history';
import {
  RouteComponentProps,
  match as Match,
  Route,
  Switch,
} from 'react-router';
import { Card } from 'components/Card';
import styled, { css } from 'styled-components';
import { ChangedPartyTracksProvider } from 'context/ChangedPartyTracksContext';
import { Tabs, Tab } from 'components/Tabs';
import PartySubscription from './PartyChangesSubscription';
import AddSelectedTracks from './AddSelectedTracks';
import { PlayerContainer } from 'context/player';
import Player from 'scenes/player';
import PlayLists from 'scenes/playlists';
import PartyPlaylist from './PartyPlaylist';
import JoinParty from './JoinParty';
import { SettingsIcon } from 'icons';
import PartySettings from './settings';
import { Permissions } from 'globalTypes';

// FIXME: Remove this ugly hardcode
const PLAYER_HEIGHT_PX = 156;

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

const PlayerWrapper = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing[2]};
`;

interface IProps extends RouteComponentProps<{ partyId: string }> {
  path?: string;
}

enum PlayerTabs {
  Queue = 'queue',
  Browse = 'browse',
  Settings = 'settings',
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
  React.useMutationEffect(
    () => {
      // TODO: This 140 is hacky af, need to get player height or something?
      window.scrollTo(0, Math.min(window.scrollY, PLAYER_HEIGHT_PX));
    },
    [activeTab],
  );

  if (!data || !data.party) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );
  }

  if ([Permissions.NONE, Permissions.PENDING].includes(data.party.permission)) {
    return (
      <JoinParty
        partyId={data.party.id}
        partyName={data.party.name}
        permission={data.party.permission}
      />
    );
  }

  return (
    <ChangedPartyTracksProvider partyId={match.params.partyId}>
      <PartyIdContext.Provider value={match.params.partyId}>
        <PartySubscription partyId={match.params.partyId} />
        <PlayerContainer>
          <Page>
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
                <ContentWrapper>
                  <Switch>
                    <Route
                      path={`${match.path}/browse`}
                      component={PlayLists}
                    />
                    {data.party.permission === Permissions.ADMIN && (
                      <Route
                        path={`${match.path}/settings`}
                        render={props => (
                          <PartySettings
                            {...props}
                            partyName={data.party.name}
                          />
                        )}
                      />
                    )}
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
        </PlayerContainer>
      </PartyIdContext.Provider>
    </ChangedPartyTracksProvider>
  );
}
