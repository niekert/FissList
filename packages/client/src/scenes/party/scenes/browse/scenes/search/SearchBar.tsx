import * as React from 'react';
import styled, { css } from 'styled-components';
import { Input } from 'components/Form';
import { isTouchDevice } from 'helpers/device';
import { CloseIcon } from 'icons';

const SearchInput = styled(Input)`
  margin: ${props => props.theme.spacing[2]};
  border-radius: 10px;
  background: ${props => props.theme.colors.raisedInput};
  border: none;
  outline: none;
  width: 100%;
  box-shadow: rgba(200, 223, 245, 0.2) 0px 4px 8px 0px;
`;

const ClearButtonWrapper = styled.button`
  position: absolute;
  top: 0;
  background: none;
  padding: 0;
  border: none;
  outline: none;
  right: 25px;
  width: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClear: () => void;
}

export function SearchBar({ value, onChange, onSubmit, onClear }: Props) {
  const inputRef = React.useRef<HTMLInputElement | undefined>(undefined);
  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <form
        css={css`
          display: flex;
          margin-bottom: 0;
        `}
        onSubmit={e => {
          e.preventDefault();

          if (inputRef.current && isTouchDevice) {
            inputRef.current.blur();
          }

          onSubmit(e);
        }}
      >
        <SearchInput
          value={value}
          onChange={onChange}
          placeholder="Search"
          ref={inputRef}
        />
      </form>
      <ClearButtonWrapper onClick={onClear}>
        <CloseIcon
          css={css`
            color: ${props => props.theme.textColors.secondary};
            width: 16px;
            height: 16px;
          `}
        />
      </ClearButtonWrapper>
    </div>
  );
}
