import * as React from 'react';
import styled from 'styled-components';
import { Card } from 'components/Card';
import IconButton from 'components/IconButton';
import BackIcon from 'icons/BackIcon';

interface IProps {
  onBack: () => void;
  onSubmit: (e: React.SyntheticEvent) => void;
  children: React.ReactNode;
}

const BackButton = styled(IconButton)`
  margin: 0 auto;
`;

const CardContent = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  width: 400px;
  max-width: 100%;
`;

export default function PartyForm({ onBack, onSubmit, children }: IProps) {
  return (
    <Card as="form" onSubmit={onSubmit}>
      <BackButton
        type="button"
        onClick={e => {
          e.stopPropagation();
          onBack();
        }}
      >
        <BackIcon />
      </BackButton>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
