import * as React from 'react';
import styled from 'styled-components';

export { default as Button } from './Button';

export const Input = styled.input`
  height: 42px;
  border-radius: 3px;
  padding: 0 ${props => props.theme.spacing[1]};
  border: 1px solid ${props => props.theme.colors.outline};
`;

// TODO: Get rid of ugly hasMargin
export const Label = styled.label<{ hasMargin?: boolean }>`
  font-weight: 600;
  margin-bottom: ${props => (props.hasMargin ? '8px' : 0)};
`;

export const FieldSet = styled.fieldset<{ marginBottom?: number }>`
  display: flex;
  background: none;
  border: none;
  flex-direction: column;
  margin-bottom: ${props => props.theme.spacing[props.marginBottom || 2]};
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
  marginBottom?: number;
  children: React.ReactNode;
  error?: React.ReactNode;
}
export function FormField({
  label,
  marginBottom,
  subTitle,
  children,
  error,
  ...props
}: IFormFieldProps) {
  return (
    <FieldSet marginBottom={marginBottom} {...props}>
      <Label hasMargin={!subTitle}>{label}</Label>
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
      <InputWrapper>{children}</InputWrapper>
      {error}
    </FieldSet>
  );
}
