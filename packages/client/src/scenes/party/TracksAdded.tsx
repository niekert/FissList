import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  position: sticky;
  bottom: 0;
  align-items: center;
  box-shadow: rgba(200, 223, 245, 0.2) 0px -8px 16px 0px;
  background: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing[2]};
`;

const Emoji = styled.div`
  font-size: 25px;
  margin-right: ${props => props.theme.spacing[2]};
`;

const Content = styled.div``;

function TracksAdded(props) {
  return (
    <Wrapper {...props}>
      <Emoji>🎉</Emoji>
      <Content>
        <b>Done!</b> The tracks you selected are added to the queue
      </Content>
    </Wrapper>
  );
}

export default TracksAdded;
