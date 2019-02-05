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

interface Props {
  emoji: React.ReactNode;
  content: React.ReactNode;
  as: any;
  onClick?: () => void;
}
function Notification({ emoji, content, as, onClick, ...props }: Props) {
  return (
    <Wrapper as={as} onClick={onClick} {...props}>
      <Emoji>{emoji}</Emoji>
      <Content>{content}</Content>
    </Wrapper>
  );
}

export default Notification;
