import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Accordion, AccordionItem } from 'components/Accordion';
import { PageHeading } from 'components/Typography';

import PartyNameForm from './PartyNameForm';
import PartyMembers from './PartyMembers';
import DeleteParty from './DeleteParty';
import styled, { css } from 'styled-components';

const ContentWrapper = styled.div`
  /* margin: 0 ${props => props.theme.spacing[2]}; */
`;

interface Props extends RouteComponentProps<{ partyId: string }> {
  partyName: string;
  requestedUserCount: number;
}

function PartySettings({ match, partyName, requestedUserCount }: Props) {
  const { partyId } = match.params;

  return (
    <>
      <PageHeading
        css={css`
          margin-left: ${props => props.theme.spacing[2]};
          margin-bottom: ${props => props.theme.spacing[1]};
        `}
      >
        Settings
      </PageHeading>

      <ContentWrapper>
        <Accordion>
          <AccordionItem
            id="members"
            title="Party members"
            activityCount={requestedUserCount}
          >
            <PartyMembers />
          </AccordionItem>
          <AccordionItem id="partyName" title="Party configuration">
            <PartyNameForm partyId={partyId} partyName={partyName} />
            <DeleteParty partyId={partyId} />
          </AccordionItem>
        </Accordion>
      </ContentWrapper>
    </>
  );
}

export default PartySettings;
