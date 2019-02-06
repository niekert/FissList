import * as React from 'react';
import styled, { css } from 'styled-components';
import Spinner from 'components/Spinner';
import { lighten } from 'polished';

const getType = ({ theme }) => {
  return css`
    background: ${theme.colors.cta};
    color: white;

    &:hover {
      background: ${lighten(0.1, theme.colors.cta)};
    }
  `;
};

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = styled(Spinner)`
  width: 22px;
  height: 22px;
`;

const Content = styled.div<{ isHidden: boolean }>`
  visibility: ${props => (props.isHidden ? 'hidden' : 'visible')};
`;

const StyledButton = styled.button<{ buttonType?: 'primary'; to?: string }>`
  position: relative;
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

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  buttonType?: 'primary' | 'destructive';
  children: React.ReactNode;
}

function Button({ isLoading, children, ...props }: IButton) {
  return (
    <StyledButton {...props}>
      <Content isHidden={isLoading}>{children}</Content>
      {isLoading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
    </StyledButton>
  );
}

export default Button;
