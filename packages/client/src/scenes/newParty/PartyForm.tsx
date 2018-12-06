import * as React from 'react';
import styled from 'styled-components';
import { Card } from 'components/Card';
import IconButton from 'components/IconButton';
import BackIcon from 'icons/BackIcon';
import { withRouter, RouteComponentProps } from 'react-router-dom';;

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
  padding: 0;
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
          // TODO: this is unsafe lol
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
