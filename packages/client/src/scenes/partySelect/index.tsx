import * as React from 'react';
import CurrentUserContext from 'context/CurrentUser';
import { Location, Router } from '@reach/router';
import NewParty from 'scenes/newParty';
import posed, { PoseGroup } from 'react-pose';
import SelectType from './SelectType';
import styled from 'styled-components';
import JoinParty from 'scenes/joinParty';

const StepsPanel = styled.div`
  display: flex;
  align-self: stretch;
  display: flex;
`;

const Item = posed.div({
  enter: {
    transform: 'translateX(0px)',
    top: 0,
    transition: { duration: 250 },
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

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <PoseGroup>
        <Item
          key={location.key}
          type={location.pathname === '/' ? 'prev' : 'next'}
        >
          <Router location={location}>{children}</Router>
        </Item>
      </PoseGroup>
    )}
  </Location>
);

function PartySelect(props: { default?: boolean }) {
  const currentUser = React.useContext(CurrentUserContext);

  if (!currentUser) {
    return null;
  }

  return (
    <StepsPanel>
      <PosedRouter>
        <SelectType default={true} />
        <NewParty path="/new" />
        <JoinParty path="/join" />
      </PosedRouter>
    </StepsPanel>
  );
}

export default PartySelect;
