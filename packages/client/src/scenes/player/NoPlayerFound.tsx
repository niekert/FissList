import * as React from 'react';
import Button from 'components/Button';
import styled from 'styled-components';

function NoPlayerFound({ onRetry, isLoading }) {
  return (
    <>
      <h3>No player found</h3>
      <p>Open the spotify app on your Phone or Laptop and click retry.</p>
      <Button onClick={onRetry} isLoading={isLoading}>
        Retry
      </Button>
    </>
  );
}

export default NoPlayerFound;
