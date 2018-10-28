import * as React from 'react';
import CurrentUserContext from 'context/CurrentUser';
import Header from 'scenes/header';
import styled from 'styled-components';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

interface IProps {
  children: React.ReactNode;
}

export default function Page({ children }: IProps) {
  return (
    <StyledPage>
      <CurrentUserContext.Consumer>
        {/* TODO@ NIek - Do we want a header? */}
        {/* {currentUser => currentUser && <Header />} */}
        {currentUser => currentUser && <div />}
      </CurrentUserContext.Consumer>
      {children}
    </StyledPage>
  );
}
