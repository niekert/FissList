import * as React from 'react';
import { usePartyContext } from '../context';
import { FormField } from 'components/Form';
import styled from 'styled-components';

const MemberList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const MemberItem = styled.li`
  font-weight: 500;
  margin-bottom: 0;
  border-bottom: 1px solid ${props => props.theme.colors.outline};
`;

export default function PartyNameForm() {
  const party = usePartyContext();

  return (
    <form>
      <MemberList>
        {party.requestedUserIds!.map(userId => (
          <MemberItem key={userId}>{userId}</MemberItem>
        ))}
      </MemberList>
    </form>
  );
}
