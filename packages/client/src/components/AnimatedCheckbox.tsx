import * as React from 'react';
import styled, { css } from 'styled-components';
import { PosedCheckIcon } from 'icons';
import { transparentize } from 'polished';

const Wrapper = styled.div`
  width: 23px;
  position: relative;
  height: 23px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.activeBackground};
  border: 1px solid ${props => transparentize(0.5, props.theme.colors.outline)};
  box-shadow: rgba(200, 223, 245, 0.2) 0px 4px 8px 0px;
`;

const CheckboxElement = styled.input.attrs({
  type: 'checkbox',
})`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
`;

interface Props {
  checked: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AnimatedCheckbox = React.forwardRef<HTMLInputElement, Props>(
  ({ checked, value, onChange }, ref) => {
    return (
      <Wrapper>
        <PosedCheckIcon
          isActive={checked}
          css={css`
            width: 25px;
            height: 25px;
          `}
        />
        <CheckboxElement
          innerRef={ref}
          checked={checked}
          onChange={onChange}
          value={value}
        />
      </Wrapper>
    );
  },
);
