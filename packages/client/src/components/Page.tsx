import * as React from 'react';
import CurrentUserContext from 'context/CurrentUser';
import styled from 'styled-components';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
`;

interface IProps {
  children: React.ReactNode;
}

export default function Page({ children }: IProps) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <StyledPage>
      {/* TODO - Do we want a header? */}
      {/* {currentUser => currentUser && <Header />} */}
      {currentUser && <div />}
      {children}
    </StyledPage>
  );
}
