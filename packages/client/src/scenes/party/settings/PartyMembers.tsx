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
  GrantPartyAccess,
  GrantPartyAccessVariables,
} from './__generated__/GrantPartyAccess';

// tslint:disable-next-line
const Wrapper = styled.div;

export default function PartyNameForm() {
  const party = usePartyContext();
  const grantAccessMutation = useMutation<
    GrantPartyAccess,
    GrantPartyAccessVariables
  >(gql`
    mutation GrantPartyAccess($partyId: String!, $userId: String!) {
      grantPartyAccess(partyId: $partyId, userId: $userId) {
        ...PartyInfo
      }
    }

    ${PartyInfo}
  `);

  const onGrantAccess = userId => {
    grantAccessMutation({
      variables: {
        userId,
        partyId: party.id,
      },
      optimisticResponse: {
        grantPartyAccess: {
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

  return (
    <form>
      <ActionList>
        <ActionListGroupTitle key="party-owners-section">
          Party owner
        </ActionListGroupTitle>
        <ActionListItem key="admin" label={party.ownerUserId} />
        {party.requestedUserIds &&
          party.requestedUserIds.length && [
            <ActionListGroupTitle key="members">
              Requested access
            </ActionListGroupTitle>,
            ...party.requestedUserIds!.map(userId => (
              <ActionListItem
                key={userId}
                label={userId}
                actions={
                  <>
                    <IconButton
                      type="button"
                      size="small"
                      withBackground={true}
                      css={css`
                        color: ${props => props.theme.colors.danger};
                        background: ${props =>
                          transparentize(0.75, props.theme.colors.danger)};
                        margin-right: ${props => props.theme.spacing[1]};
                      `}
                    >
                      <CloseIcon />
                    </IconButton>
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
        {party.partyUserIds && party.partyUserIds.length && (
          <>
            <ActionListGroupTitle key="activeMembers">
              Active members
            </ActionListGroupTitle>
            {party.partyUserIds!.map(userId => (
              <ActionListItem key={userId} label={userId} />
            ))}
          </>
        )}
      </ActionList>
    </form>
  );
}
