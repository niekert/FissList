import styled from 'styled-components';

export default styled.button`
  background: none;
  color: ${props => props.theme.textColors.primary};
  outline: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;

  svg {
    width: 28px;
    height: 28px;
  }
`;
