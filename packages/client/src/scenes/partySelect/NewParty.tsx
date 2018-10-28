import * as React from 'react';
import IconButton from 'components/IconButton';
import BackIcon from 'icons/BackIcon';
import styled from 'styled-components';
import { Card, CardTitle } from 'components/Card';

interface IProps {
  onBack: () => void;
}

function NewParty({ onBack }: IProps) {
  return (
    <Card>
      <IconButton onClick={onBack}>
        <BackIcon />
      </IconButton>
      <CardTitle>Start a new party</CardTitle>
      <p>Start a new party</p>
    </Card>
  );
}

export default NewParty;
