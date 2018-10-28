import styled from 'styled-components';

export const Text = styled.p<{
  textAlign?: 'center' | 'left' | 'inherit' | 'right';
}>`
  text-align: ${props => props.textAlign || 'inherit'};
`;

export const Title = styled.h1`
  text-align: center;
`;
