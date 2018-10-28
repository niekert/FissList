import * as React from 'react';
import styled from 'styled-components';

export { default as Button } from './Button';

export const Input = styled.input`
  height: 42px;
  border-radius: 3px;
  border: 1px solid grey;
`;

export const Label = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
`;

export const FieldSet = styled.fieldset`
  display: flex;
  background: none;
  border: none;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface IFormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: React.ReactNode;
}
export function FormField({
  label,
  children,
  error,
  ...props
}: IFormFieldProps) {
  return (
    <FieldSet {...props}>
      <Label>{label}</Label>
      <InputWrapper>{children}</InputWrapper>
      {error}
    </FieldSet>
  );
}
