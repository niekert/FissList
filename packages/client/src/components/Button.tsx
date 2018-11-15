import styled, { css } from 'styled-components';
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

export default StyledButton;
