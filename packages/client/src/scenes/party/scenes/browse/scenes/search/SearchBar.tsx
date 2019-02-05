import * as React from 'react';
import styled from 'styled-components';
import { Input } from 'components/Form';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = styled(Input).attrs({ type: 'search' })`
  margin: ${props => props.theme.spacing[2]};
  border-radius: 10px;
  background: white;
  outline: none;

  box-shadow: rgba(200, 223, 245, 0.2) 0px 4px 8px 0px;
`;

export function SearchBar({ value, onChange }: Props) {
  return <SearchInput value={value} onChange={onChange} placeholder="Search" />;
}
