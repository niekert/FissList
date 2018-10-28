import styled from 'styled-components';

export const Text = styled.p<{
  textAlign?: 'center' | 'left' | 'inherit' | 'right';
}>`
  text-align: ${props => props.textAlign || 'inherit'};
  margin-bottom: 16px;
`;

export const Title = styled.h1`
  text-align: center;
`;
