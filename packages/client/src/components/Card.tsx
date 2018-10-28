import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 4px;

  :after {
    content: '';
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0.6;
    transition: opacity 100ms ease-out;
    box-shadow: rgba(200, 223, 245, 0.5) 0px 8px 16px 0px;
  }
`;

export const CardTitle = styled.div`
  font-weight: 600;
`;
