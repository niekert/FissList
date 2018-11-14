import * as React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten } from 'polished';

const getType = ({ buttonType = 'primary', theme }) => {
  return css`
    background: ${theme.colors.cta};
    color: white;

    &:hover {
      background: ${lighten(0.1, theme.colors.cta)};
    }
  `;
};

const StyledButton = styled.button<{ buttonType?: 'primary'; to?: string }>`
  border-radius: 4px;
  text-shadow: none;
  -webkit-appearance: none;
  border: none;
  cursor: pointer;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  &:focus {
    outline: none;
  }

  ${getType};
`;

StyledButton.defaultProps = {
  buttonType: 'primary',
};

function Button({ to, ...props }: { to: string }) {
  if (to) {
    return <StyledButton {...props} to={to} as={Link} />;
  }

  return <StyledButton {...props} />;
}

export default Button;
