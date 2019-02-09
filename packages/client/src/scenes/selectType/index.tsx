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
import styled, { css } from 'styled-components';
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
              body="Create a new party playlist that your friends can request songs for"
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
              <Card
                css={css`
                  padding: 0;
                `}
              >
                <CardTitle
                  css={css`
                    padding: ${props => props.theme.spacing[2]};
                    padding-bottom: 0;
                  `}
                >
                  Your parties
                </CardTitle>
                {parties.map(party => (
                  <Party
                    key={party!.id}
                    name={party!.name}
                    userCount={party.userCount}
                    updatedAt={party.updatedAt}
                    onClick={() => history.push(`/party/${party!.id}`)}
                  />
                ))}
              </Card>
            )}
          </PosedListItem>

          <PosedListItem key="logout">
            <Text textAlign="center" key="logout">
              <Link onClick={() => logout()}>Log out</Link>
            </Text>
          </PosedListItem>
        </PoseGroup>
      </PartyOptions>
    </>
  );
}

export default withRouter<IProps>(SelectType);
