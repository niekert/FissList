import * as React from 'react';
import Button from 'components/Button';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 4px;
  box-shadow: rgba(200, 223, 245, 0.5) 0px 8px 16px 0px;
`;

const Title = styled.div`
  font-weight: 600;
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
    <Wrapper>
      <Title>{title}</Title>
      <Body>{body}</Body>
      <Cta onClick={onClick}>{cta}</Cta>
    </Wrapper>
  );
}
