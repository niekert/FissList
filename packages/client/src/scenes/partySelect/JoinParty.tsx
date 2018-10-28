import * as React from 'react';
import PartyForm from './PartyForm';
import { Card, CardTitle } from 'components/Card';

interface IProps {
  onBack: () => void;
}

function JoinParty({ onBack }: IProps) {
  return (
    <PartyForm onBack={onBack}>
      <CardTitle>Join a party</CardTitle>
      <p>Start a new party</p>
    </PartyForm>
  );
}

export default JoinParty;
