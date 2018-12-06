import styled, { css } from 'styled-components';

const sizes = {
  small: 22,
  normal: 28,
};

const IconButton = styled.button<{
  size?: 'small' | 'normal';
  withBackground?: boolean;
}>`
  background: none;
  color: ${props => props.theme.textColors.primary};
  outline: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  svg {
    width: ${props => sizes[props.size]}px;
    height: ${props => sizes[props.size]}px;
  }

  ${props =>
    props.withBackground &&
    css`
      padding: 2px;
      border-radius: 50%;
    `}
`;

IconButton.defaultProps = {
  size: 'normal',
};

export default IconButton;
