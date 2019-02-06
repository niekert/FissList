import * as React from 'react';
import styled, { css } from 'styled-components';
import { Input } from 'components/Form';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchInput = styled(Input).attrs({ type: 'search' })`
  margin: ${props => props.theme.spacing[2]};
  border-radius: 10px;
  background: ${props => props.theme.colors.raisedInput};
  border: none;
  outline: none;
  width: 100%;
  box-shadow: rgba(200, 223, 245, 0.2) 0px 4px 8px 0px;
`;

export function SearchBar({ value, onChange, onSubmit }: Props) {
  return (
    <form
      css={css`
        display: flex;
        margin-bottom: 0;
      `}
      onSubmit={e => {
        e.preventDefault();
        console.log('submitting');
        onSubmit(e);
      }}
    >
      <SearchInput value={value} onChange={onChange} placeholder="Search" />
    </form>
  );
}
