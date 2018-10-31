import * as React from 'react';
import { Title, Text } from 'components/Typography';
import { navigate } from '@reach/router';
import { Card, CardTitle } from 'components/Card';
import Link from 'components/Link';
import useLogout from 'hooks/logout';
import OptionCard from './OptionCard';
import styled from 'styled-components';

const PartyOptions = styled.div`
  max-width: 350px;
  margin: 0 auto;
`;

const IntroText = styled(Text)`
  max-width: 420px;
  margin: 0 auto 16px auto;
`;

interface IProps {
  // workaround for reach router
  default?: boolean;
}

export default function SelectType(props: IProps) {
  const logout = useLogout();

  return (
    <>
      {/* TODO: Rename app title and use logo */}
      <Title>PampaPlay</Title>
      <IntroText textAlign="center">
        PampaPlay helps you play the best music during parties by letting your
        guests decide the songs that will play next.
      </IntroText>
      <PartyOptions>
        <OptionCard
          title="🔊 Start a new party"
          body="Click this button to start a new party and get a shareable party link"
          cta={'Start party'}
          onClick={() => navigate('/new')}
        />
        <OptionCard
          title="🎉 Join a party"
          body="Join a friend's party by filling in the party code"
          cta={'Join party'}
          onClick={() => navigate('/join')}
        />
        <Card>
          <CardTitle>Existing parties</CardTitle>
        </Card>
      </PartyOptions>
      <Text textAlign="center">
        Or, if you are done using PampaPlay,{' '}
        <Link onClick={() => logout()}>Log out</Link>
      </Text>
    </>
  );
}
