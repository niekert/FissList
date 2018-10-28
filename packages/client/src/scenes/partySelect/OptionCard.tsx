import * as React from 'react';
import Button from 'components/Button';
import { Card, CardTitle } from 'components/Card';
import styled from 'styled-components';

const Wrapper = styled(Card)`
  :hover:after {
    opacity: 1;
  }
`;

const Body = styled.p``;

const Cta = styled(Button)`
  align-self: flex-start;
`;

interface IProps {
  title: React.ReactNode;
  body: React.ReactNode;
  cta: React.ReactNode;
  onClick: () => void;
}

export default function OptionCard({ title, body, onClick, cta }: IProps) {
  return (
    <Wrapper onClick={onClick}>
      <CardTitle>{title}</CardTitle>
      <Body>{body}</Body>
      <Cta>{cta}</Cta>
    </Wrapper>
  );
}
