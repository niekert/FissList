import * as React from 'react';
import Button from 'components/Button';
import styled from 'styled-components';

const Title = styled.h3`
  margin-top: ${props => props.theme.spacing[1]};
`;
function NoPlayerFound({ onRetry, isLoading }) {
  return (
    <>
      <Title>No player found</Title>
      <p>Open the spotify app on your Phone or Laptop and click retry.</p>
      <Button onClick={onRetry} isLoading={isLoading}>
        Retry
      </Button>
    </>
  );
}

export default NoPlayerFound;
