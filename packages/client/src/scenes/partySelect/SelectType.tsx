import * as React from 'react';
import { Title, Text } from 'components/Typography';
import { navigate } from '@reach/router';
import Link from 'components/Link';
import useLogout from 'hooks/logout';
import OptionCard from './OptionCard';
import styled from 'styled-components';

const PartyOptions = styled.div`
  max-width: 350px;
  margin: 0 auto;
`;

interface IProps {
  // workaround for reach router
  default?: boolean;
}

export default function SelectType(props: IProps) {
  const logout = useLogout();

  return (
    <>
      <Title>Welcome to PartyPlay!</Title>
      <Text textAlign="center">
        Start a new party, or join a friends' party
      </Text>
      <PartyOptions>
        <OptionCard
          title="Start a new party"
          body="Woohoo! Click this button to start a new party and share the link to the party with your friends!"
          cta={'Start party'}
          onClick={() => navigate('/new')}
        />
        <OptionCard
          title="Join a party"
          body="Join a friend's party by filling in the party code"
          cta={'Join party'}
          onClick={() => navigate('/join')}
        />
      </PartyOptions>
      <Text textAlign="center">
        Or, if you are done using PartyPlay,{' '}
        <Link onClick={() => logout()}>Log out</Link>
      </Text>
    </>
  );
}
