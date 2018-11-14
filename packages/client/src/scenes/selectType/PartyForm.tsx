import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router';
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
`;

const CardContent = styled(Card)`
  margin: 0 auto;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  width: 400px;
  max-width: 100%;
`;

interface IProps extends RouteComponentProps {
  children: React.ReactNode;
}

function PartyForm({ children, history }: IProps) {
  return (
    <Form>
      <BackButton
        type="button"
        onClick={e => {
          e.stopPropagation();

          history.push('/');
        }}
      >
        <BackIcon />
      </BackButton>
      <CardContent>{children}</CardContent>
    </Form>
  );
}

export default withRouter(PartyForm);
