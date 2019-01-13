import * as React from 'react';
import styled from 'styled-components';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: 1000px;

  margin: 0 auto;
`;

interface IProps {
  children: React.ReactNode;
}

export default function Page({ children }: IProps) {
  return (
    <StyledPage>
      {/* TODO - Do we want a header? */}
      {children}
    </StyledPage>
  );
}
