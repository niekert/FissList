import * as React from 'react';
import Page from 'components/Page';
import styled from 'styled-components';
import { Title } from 'components/Typography';
import { Input, Label, Button } from 'components/Form';
import { Card } from 'components/Card';

const ProTip = styled.div`
  margin-top: ${props => props.theme.spacing[3]};
  color: ${props => props.theme.textColors.secondary};
`;

const JoinButton = styled(Button)`
  align-self: flex-start;
  margin-top: ${props => props.theme.spacing[2]};
`;

function JoinParty() {
  return (
    <Page>
      <Title>Join party</Title>
      <Card>
        {/* <CardTitle>Enter party code</CardTitle> */}
        <p>Enter the party code to join a new party</p>
        <Label>Party code</Label>
        <Input type="text" />
        <JoinButton>Join party</JoinButton>

        <ProTip>
          <div>
            <b>Pro tip: </b>
          </div>
          Just let your friends share the party link instead of manually
          entering this code.
        </ProTip>
      </Card>
    </Page>
  );
}

export default JoinParty;
