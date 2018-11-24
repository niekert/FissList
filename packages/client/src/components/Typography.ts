import styled from 'styled-components';

export const Text = styled.p<{
  marginBottom?: number;
  textAlign?: 'center' | 'left' | 'inherit' | 'right';
}>`
  text-align: ${props => props.textAlign || 'inherit'};
  margin-bottom: ${props => props.theme.spacing[props.marginBottom || 2]};
`;

export const Title = styled.h1`
  color: ${props => props.theme.textColors.primary};
  text-align: center;
`;
