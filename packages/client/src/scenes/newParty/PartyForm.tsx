import * as React from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import { Card } from 'components/Card';
import IconButton from 'components/IconButton';
import BackIcon from 'icons/BackIcon';

const BackButton = styled(IconButton)`
  margin: 0 auto;

  svg {
    min-height: 18px;
    min-height: 18px;
  }
`;

const Form = styled.form`
  margin-bottom: 0;
  flex: 1;
`;

const CardContent = styled(Card)`
  margin: 0 auto;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  width: 400px;
  max-width: 100%;
`;

interface IProps {
  children: React.ReactNode;
}
export default function PartyForm({ children }: IProps) {
  return (
    <Form>
      <BackButton
        type="button"
        onClick={e => {
          e.stopPropagation();
          // TODO: this is unsafe lol
          navigate('/');
        }}
      >
        <BackIcon />
      </BackButton>
      <CardContent>{children}</CardContent>
    </Form>
  );
}
