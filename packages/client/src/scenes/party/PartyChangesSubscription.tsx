import * as React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';
import { PartyInfo } from 'fragments/Party';
import {
  PartySubscription,
  PartySubscriptionVariables,
} from './__generated__/PartySubscription';

const PARTY_SUBSCRIPTION = gql`
  subscription PartySubscription($partyId: String!) {
    party(partyId: $partyId) {
      ...PartyInfo
    }
  }

  ${PartyInfo}
`;

class PartyChangesSubscription extends Subscription<
  PartySubscription,
  PartySubscriptionVariables
> {}

export default function PartySubscriptionComponent({
  partyId,
}: {
  partyId: string;
}) {
  return (
    <PartyChangesSubscription
      shouldResubscribe={true}
      fetchPolicy="network-only"
      subscription={PARTY_SUBSCRIPTION}
      variables={{
        partyId,
      }}
    />
  );
}
