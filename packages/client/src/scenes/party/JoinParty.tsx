import * as React from 'react';
import gql from 'graphql-tag';
import Page from 'components/Page';
import { css } from 'styled-components';
import styled from 'styled-components';
import Button from 'components/Button';
import PosedListItem from 'components/PosedListItem';
import MovingGhost from 'illustrations/MovingGhost';
import { PoseGroup } from 'react-pose';
import { Title } from 'components/Typography';
import { useStateMutation } from 'hooks';
import {
  JoinPartyRequest,
  JoinPartyRequestVariables,
} from './__generated__/JoinPartyRequest';
import { Permissions } from 'globalTypes';
import { Label, Input } from 'components/Form';

const JOIN_PARTY_REQUEST = gql`
  mutation JoinPartyRequest($partyId: String!, $displayName: String!) {
    requestPartyAccess(partyId: $partyId, displayName: $displayName) {
      id
    }
  }
`;

const Wrapper = styled.div`
  padding: 0 ${props => props.theme.spacing[2]};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.p`
  text-align: center;
`;

interface Props {
  partyName: string;
  partyId: string;
  permission: Permissions;
}

function JoinPartyForm({ partyId }: Props) {
  const [displayName, setDisplayName] = React.useState('');
  const { mutate, isSuccess, isLoading } = useStateMutation<
    JoinPartyRequest,
    JoinPartyRequestVariables
  >(JOIN_PARTY_REQUEST);

  const requestAccess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      variables: {
        partyId,
        displayName,
      },
    });
  };

  const isWaiting = isSuccess;

  return (
    <PoseGroup animateOnMount={true}>
      <PosedListItem key="join-party">
        <Wrapper>
          <MovingGhost
            mood={isWaiting ? undefined : 'happy'}
            css={css`
              margin-top: ${props => props.theme.spacing[2]};
            `}
          />
          {!isWaiting ? (
            <Page>
              <Title>Right on time</Title>

              <Text>
                The party is just getting started. <br /> Click the button below
                to request access
              </Text>

              <form
                onSubmit={requestAccess}
                css={css`
                  display: flex;
                  flex-direction: column;
                `}
              >
                <Label hasMargin={true}>
                  Your name:
                  <Input
                    type="text"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    required={true}
                    css={css`
                      display: block;
                      font-weight: 500;
                    `}
                  />
                </Label>

                <Button
                  type="submit"
                  isLoading={isLoading}
                  css={css`
                    text-align: center;
                  `}
                >
                  Request to join
                </Button>
              </form>
            </Page>
          ) : (
            <Page>
              <Title>Awaiting access</Title>

              <Text>
                Great, you're all set to join the party. Ask the party host to
                accept your request.
              </Text>
            </Page>
          )}
        </Wrapper>
      </PosedListItem>
    </PoseGroup>
  );
}

export default JoinPartyForm;
