import * as React from 'react';
import { Title, Text } from 'components/Typography';
import { withRouter } from 'react-router-dom';
import { Card, CardTitle } from 'components/Card';
import { PoseGroup } from 'react-pose';
import PosedListItem from 'components/PosedListItem';
import Link from 'components/Link';
import Party from 'components/Party';
import useLogout from 'hooks/logout';
import OptionCard from './OptionCard';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import { PartyInfo } from 'fragments/__generated__/PartyInfo';

const PartyOptions = styled.div`
  max-width: 350px;
  margin: 0 auto;
`;

const IntroText = styled(Text)`
  max-width: 420px;
  margin: 0 auto 16px auto;
`;

interface IProps extends RouteComponentProps {
  // workaround for reach router
  default?: boolean;
  parties: PartyInfo[];
}

function SelectType({ history, parties }: IProps) {
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
        <PoseGroup animateOnMount={true}>
          <PosedListItem key="main-group">
            <OptionCard
              title="🔊 Start a new party"
              body="Click this button to start a new party and get a shareable party link"
              cta={'Start party'}
              onClick={() => history.push('/new')}
            />
            <OptionCard
              title="🎉 Join a party"
              body="Join a friend's party by filling in the party code"
              cta={'Join party'}
              onClick={() => history.push('/join')}
            />
            {parties.length > 0 && (
              <Card>
                <CardTitle>Existing parties</CardTitle>
                {parties.map(party => (
                  <Party
                    key={party!.id}
                    name={party!.name}
                    onClick={() => history.push(`/party/${party!.id}`)}
                  />
                ))}
              </Card>
            )}
          </PosedListItem>
        </PoseGroup>
      </PartyOptions>
      <Text textAlign="center">
        Or, if you are done using PampaPlay,{' '}
        <Link onClick={() => logout()}>Log out</Link>
      </Text>
    </>
  );
}

export default withRouter<IProps>(SelectType);
