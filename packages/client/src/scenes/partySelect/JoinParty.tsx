import * as React from 'react';
import IconButton from 'components/IconButton';
import BackIcon from 'icons/BackIcon';
import styled from 'styled-components';
import { Card, CardTitle } from 'components/Card';

interface IProps {
  onBack: () => void;
}

function JoinParty({ onBack }: IProps) {
  return (
    <Card>
      <IconButton onClick={onBack}>
        <BackIcon />
      </IconButton>
      <CardTitle>Join a party</CardTitle>
      <p>Start a new party</p>
    </Card>
  );
}

export default JoinParty;
