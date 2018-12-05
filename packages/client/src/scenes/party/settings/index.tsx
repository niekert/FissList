import * as React from 'react';
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

function PartySettings() {
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
        <PartyNameForm />
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
