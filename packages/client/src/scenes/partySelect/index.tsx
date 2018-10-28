import * as React from 'react';
import useLogout from 'hooks/logout';
import CurrentUserContext from 'context/CurrentUser';
import NewParty from './NewParty';
import Page from 'components/Page';
import styled from 'styled-components';
import OptionCard from './OptionCard';
import Link from 'components/Link';
import posed, { PoseGroup } from 'react-pose';
import JoinParty from './JoinParty';

const PartyOptions = styled.div`
  max-width: 350px;
  margin: 0 auto;
`;

const StepsPanel = styled.div`
  display: flex;
  align-self: stretch;
  display: flex;
`;

const Intro = styled.p``;

const Welcome = styled.h1`
  text-align: center;
`;

const Item = posed.div({
  enter: {
    transform: 'translateX(0px)',
    transition: { duration: 300 },
    width: '100%',
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transform: ({ type }) =>
      `translateX(${type === 'prev' ? '-300px' : '300px'})`,
    transition: { duration: 300 },
  },
  props: {
    type: 'prev',
  },
});

enum SCREEN_TYPES {
  'SELECT',
  'NEW_PARTY',
  'JOIN_PARTY',
}

interface IAction {
  type: 'SET_ACTIVE_SCREEN';
  screen?: SCREEN_TYPES;
}

type State = SCREEN_TYPES;

function PartySelect() {
  // TODO: this API is unforunate.
  // Would be nicec if we could have `useApollo` in `useUnlink`.
  const logout = useLogout();
  const currentUser = React.useContext(CurrentUserContext);
  const [activeScreen, dispatch] = React.useReducer(
    (state: State, action: IAction) => {
      switch (action.type) {
        case 'SET_ACTIVE_SCREEN':
          return action.screen;
        default:
          return state;
      }
    },
    SCREEN_TYPES.SELECT,
  );

  const onBack = () =>
    dispatch({ type: 'SET_ACTIVE_SCREEN', screen: SCREEN_TYPES.SELECT });

  if (!currentUser) {
    return null;
  }

  return (
    <Page>
      <Welcome>Welcome to PartyPlay!</Welcome>
      <Intro>Start a new party, or join a friends' party</Intro>

      <StepsPanel>
        <PoseGroup>
          {activeScreen === SCREEN_TYPES.SELECT && (
            <Item key={activeScreen} type="prev">
              <PartyOptions>
                <OptionCard
                  title="Start a new party"
                  body="Woohoo! Click this button to start a new party and share the link to the party with your friends!"
                  cta={'Start party'}
                  onClick={() =>
                    dispatch({
                      type: 'SET_ACTIVE_SCREEN',
                      screen: SCREEN_TYPES.NEW_PARTY,
                    })
                  }
                />
                <OptionCard
                  title="Join a party"
                  body="Join a friend's party by filling in the party code"
                  cta={'Join party'}
                  onClick={() => {
                    dispatch({
                      type: 'SET_ACTIVE_SCREEN',
                      screen: SCREEN_TYPES.JOIN_PARTY,
                    });
                  }}
                />
              </PartyOptions>
              <p>
                Or, if you are done using PartyPlay,{' '}
                <Link onClick={() => logout()}>Log out</Link>
              </p>
            </Item>
          )}
          {activeScreen === SCREEN_TYPES.NEW_PARTY && (
            <Item key={activeScreen} type="next">
              <NewParty onBack={onBack} />
            </Item>
          )}
          {activeScreen === SCREEN_TYPES.JOIN_PARTY && (
            <Item key={activeScreen} type="next">
              <JoinParty onBack={onBack} />
            </Item>
          )}
        </PoseGroup>
      </StepsPanel>
    </Page>
  );
}

export default PartySelect;
