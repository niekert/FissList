import * as React from 'react';
import gql from 'graphql-tag';
import Page from 'components/Page';
import styled from 'styled-components';
import Button from 'components/Button';
import PosedListItem from 'components/PosedListItem';
import { PoseGroup } from 'react-pose';
import { Title } from 'components/Typography';
import { useStateMutation } from 'hooks';
import {
  JoinPartyRequest,
  JoinPartyRequestVariables,
} from './__generated__/JoinPartyRequest';
import { Permissions } from 'globalTypes';

const JOIN_PARTY_REQUEST = gql`
  mutation JoinPartyRequest($partyId: String!) {
    requestPartyAccess(partyId: $partyId) {
      id
    }
  }
`;

const Wrapper = styled.div`
  padding: 0 ${props => props.theme.spacing[2]};
`;

const Text = styled.p`
  text-align: center;
`;

interface Props {
  partyName: string;
  partyId: string;
  permission: Permissions;
}

function JoinPartyForm({ partyName, partyId, permission }: Props) {
  const { mutate, isSuccess, isLoading } = useStateMutation<
    JoinPartyRequest,
    JoinPartyRequestVariables
  >(JOIN_PARTY_REQUEST);

  const requestAccess = () => {
    mutate({
      variables: {
        partyId,
      },
    });
  };

  return (
    <Wrapper>
      <PoseGroup animateOnMount={true}>
        {!isSuccess ? (
          <PosedListItem key="join-party">
            <Page>
              <Title>
                🍸 <br /> <br /> {partyName}
              </Title>

              <Text>Just in time. The party is just getting started.</Text>
              <Text>People in party: TODO</Text>

              <Button
                type="button"
                isLoading={isLoading}
                onClick={requestAccess}
              >
                Request to join
              </Button>
            </Page>
          </PosedListItem>
        ) : (
          <PosedListItem key="done">
            <Page>
              <Title>Done!</Title>

              <Text>
                Great, you're all set to join the party. Ask the party host to
                accept your request.
              </Text>
            </Page>
          </PosedListItem>
        )}
      </PoseGroup>
    </Wrapper>
  );
}

export default JoinPartyForm;
