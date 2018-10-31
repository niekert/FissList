import * as React from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import { Label, Input, Button } from 'components/Form';
import { Text, Title } from 'components/Typography';
import Page from 'components/Page';
import { Card } from 'components/Card';
import posed, { PoseGroup } from 'react-pose';

const PosedCard = posed.div({
  enter: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
  exit: {
    opacity: 0,
    transform: 'translateY(20px)',
  },
});

const Wrapper = styled(PosedCard)`
  max-width: 500px;
  align-self: center;
`;

const CopyLinkInput = styled(Input)`
  &[readonly] {
    color: ${props => props.theme.textColors.secondary};
  }
`;

const OpenPartyButton = styled(Button)`
  align-self: flex-start;
  margin-top: ${props => props.theme.spacing[2]};
`;

interface IProps {
  partyId: string;
  name: string;
}

function NewPartyCard({ partyId, name }: IProps) {
  const link = `${window.location.origin}/party/${partyId}`;
  return (
    <Page>
      <PoseGroup>
        <Wrapper key="new-party-card" initialPose="exit">
          <Title>🎉</Title>
          <Card>
            <Label hasMargin={true}>Boom!</Label>
            <Text>
              Your party <b>{name}</b> is ready to get started! Share this link
              with your friends or open the party yourself
            </Text>

            <Label>Party link</Label>
            <CopyLinkInput readOnly={true} value={link} />

            <OpenPartyButton onClick={() => navigate(`/party/${partyId}`)}>
              Open party
            </OpenPartyButton>
          </Card>
        </Wrapper>
      </PoseGroup>
    </Page>
  );
}

export default NewPartyCard;