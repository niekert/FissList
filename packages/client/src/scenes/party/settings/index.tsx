import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { PageHeading } from 'components/Typography';

import PartyNameForm from './PartyNameForm';
import PartyMembers from './PartyMembers';
import DeleteParty from './DeleteParty';
import styled, { css } from 'styled-components';

const Section = styled.div`
  padding: 0 ${props => props.theme.spacing[2]}
    ${props => props.theme.spacing[2]} ${props => props.theme.spacing[2]};
  border-bottom: 1px solid ${props => props.theme.colors.outline};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

interface Props extends RouteComponentProps<{ partyId: string }> {
  partyName: string;
}

function PartySettings({ match, partyName }: Props) {
  const { partyId } = match.params;

  return (
    <>
      <PageHeading
        css={css`
          margin-left: ${props => props.theme.spacing[2]};
        `}
      >
        Party settings
      </PageHeading>
      <Section>
        <PartyNameForm partyId={partyId} partyName={partyName} />
      </Section>
      <Section>
        <PartyMembers />
      </Section>
      <Section>
        <DeleteParty />
      </Section>
    </>
  );
}

export default PartySettings;
