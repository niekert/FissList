import * as React from 'react';
import gql from 'graphql-tag';
import { usePartyContext } from '../context';
import IconButton from 'components/IconButton';
import { CheckmarkIcon, CloseIcon } from 'icons';
import { useMutation } from 'react-apollo-hooks';
import {
  ActionList,
  ActionListItem,
  ActionListGroupTitle,
} from 'components/ActionList';
import { transparentize } from 'polished';
import styled, { css } from 'styled-components';
import { PartyInfo } from 'fragments/Party';
import {
  SetPartyAccess,
  SetPartyAccessVariables,
} from './__generated__/SetPartyAccess';

// tslint:disable-next-line
const RejectButton = styled(IconButton).attrs({
  type: 'button',
  size: 'small',
  withBackground: true,
})`
  color: ${props => props.theme.colors.danger};
  background: ${props => transparentize(0.75, props.theme.colors.danger)};
  margin-right: ${props => props.theme.spacing[1]};
`;

const SET_PARTY_ACCESS = gql`
  mutation SetPartyAccess(
    $partyId: String!
    $userId: String!
    $grant: Boolean!
  ) {
    setPartyAccess(partyId: $partyId, userId: $userId, grant: $grant) {
      ...PartyInfo
    }
  }

  ${PartyInfo}
`;

export default function PartyNameForm() {
  const party = usePartyContext();
  const setAccessMutation = useMutation<
    SetPartyAccess,
    SetPartyAccessVariables
  >(SET_PARTY_ACCESS);

  const onGrantAccess = (userId: string) => {
    setAccessMutation({
      variables: {
        userId,
        partyId: party.id,
        grant: true,
      },
      optimisticResponse: {
        setPartyAccess: {
          __typename: 'Party',
          ...party,
          requestedUserIds: party.requestedUserIds!.filter(
            requestedUserId => requestedUserId !== userId,
          ),
          partyUserIds: [...(party.partyUserIds || []), userId],
        },
      },
    });
  };

  const onRejectAccess = (userId: string) => {
    setAccessMutation({
      variables: {
        userId,
        partyId: party.id,
        grant: false,
      },
      optimisticResponse: {
        setPartyAccess: {
          __typename: 'Party',
          ...party,
          requestedUserIds: party.requestedUserIds!.filter(
            requestedUserId => requestedUserId !== userId,
          ),
          partyMemberIds: party.partyUserIds!.filter(
            requestedUserId => requestedUserId !== userId,
          ),
        },
      },
    });
  };

  return (
    <form>
      <ActionList>
        <ActionListGroupTitle key="party-owners-section">
          Party owner
        </ActionListGroupTitle>
        <ActionListItem key="admin" label={party.ownerUserId} />
        {party.requestedUserIds &&
          party.requestedUserIds.length && [
            <ActionListGroupTitle key="requested-members">
              Requested access
            </ActionListGroupTitle>,
            ...party.requestedUserIds!.map(userId => (
              <ActionListItem
                key={`requested-${userId}`}
                label={userId}
                actions={
                  <>
                    <RejectButton onClick={() => onRejectAccess(userId)}>
                      <CloseIcon />
                    </RejectButton>
                    <IconButton
                      type="button"
                      size="small"
                      withBackground={true}
                      onClick={() => onGrantAccess(userId)}
                      css={css`
                        background: ${props =>
                          transparentize(0.75, props.theme.colors.success)};
                        color: ${props => props.theme.colors.success};
                      `}
                    >
                      <CheckmarkIcon />
                    </IconButton>
                  </>
                }
              />
            )),
          ]}
        {party.partyUserIds &&
          party.partyUserIds.length && [
            <ActionListGroupTitle key="activeMembers">
              Active members
            </ActionListGroupTitle>,
            ...party.partyUserIds!.map(userId => (
              <ActionListItem
                key={`active-${userId}`}
                label={userId}
                actions={
                  <RejectButton onClick={() => onRejectAccess(userId)}>
                    <CloseIcon />
                  </RejectButton>
                }
              />
            )),
          ]}
      </ActionList>
    </form>
  );
}
