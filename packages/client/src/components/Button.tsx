import styled, { css } from 'styled-components';
import { lighten } from 'polished';

const getType = ({ buttonType = 'primary', theme }) => {
  // TODO: get
  return css`
    background: ${theme.colors.cta};
    color: white;

    &:hover {
      background: ${lighten(0.1, theme.colors.cta)};
    }
  `;
};

const Button = styled.div<{ buttonType?: 'primary' }>`
  border-radius: 4px;
  cursor: pointer;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 16px;

  ${getType};
`;

Button.defaultProps = {
  buttonType: 'primary',
};

export default Button;
