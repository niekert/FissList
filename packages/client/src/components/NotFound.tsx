import * as React from 'react';
import { Browser } from 'react-kawaii';
import styled from 'styled-components';
import { transparentize } from 'polished';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;
const SubTitle = styled.h2`
  margin-top: 0;
  font-size: 20px;
  color: ${props => props.theme.textColors.secondary};
`;

function NotFound() {
  return (
    <Page>
      <Title>Not found</Title>
      <SubTitle>This link no longer exists. Sorry about that!</SubTitle>

      <Browser size={180} mood="sad" color={transparentize(0.5, '#05f')} />
    </Page>
  );
}

export default NotFound;
