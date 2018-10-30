import * as React from 'react';
import PartyForm from './PartyForm';
import { Card, CardTitle } from 'components/Card';

interface IProps {
  path?: string;
}

function JoinParty(props: IProps) {
  return (
    <PartyForm>
      <CardTitle>Join a party</CardTitle>
      <p>Start a new party</p>
    </PartyForm>
  );
}

export default JoinParty;
