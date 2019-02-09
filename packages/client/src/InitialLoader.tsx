import * as React from 'react';
import Spinner from 'components/Spinner';
import styled from 'styled-components';

const FullScreen = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const ServersBooting = styled.div`
  margin-top: ${props => props.theme.spacing[1]};
  text-align: center;
`;

function InitialLoader() {
  const [isTakingTooLong, setIsTakingTooLong] = React.useState(false);
  React.useEffect(() => {
    const timeout = setTimeout(() => setIsTakingTooLong(true), 3000);
    return () => clearTimeout(timeout);
  }, [setIsTakingTooLong]);
  return (
    <FullScreen>
      <div>
        <Spinner />
      </div>
      {isTakingTooLong && (
        <ServersBooting>
          Servers are booting up... <br /> This might take a while for the first
          load
        </ServersBooting>
      )}
    </FullScreen>
  );
}

export default InitialLoader;
