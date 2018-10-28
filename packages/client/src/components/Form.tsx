import * as React from 'react';
import styled from 'styled-components';

export { default as Button } from './Button';

export const Input = styled.input`
  height: 42px;
  border-radius: 3px;
  border: 1px solid ${props => props.theme.colors.outline};
`;

export const Label = styled.label<{ hasMargin: boolean }>`
  font-weight: 600;
  margin-bottom: ${props => (props.hasMargin ? '8px' : 0)};
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

export const SubTitle = styled.span`
  display: block;
  font-size: 14px;
  line-height: 1;
  margin-bottom: 16px;
`;

interface IFormFieldProps {
  label: string;
  subTitle?: string;
  children: React.ReactNode;
  error?: React.ReactNode;
}
export function FormField({
  label,
  subTitle,
  children,
  error,
  ...props
}: IFormFieldProps) {
  return (
    <FieldSet {...props}>
      <Label hasMargin={!subTitle}>{label}</Label>
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
      <InputWrapper>{children}</InputWrapper>
      {error}
    </FieldSet>
  );
}