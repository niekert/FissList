import * as React from 'react';
import styled, { css } from 'styled-components';
import { number } from 'prop-types';

const Badge = styled.span`
  min-width: 17px;
  min-height: 17px;
  background: ${props => props.theme.colors.notification};
  color: ${props => props.theme.colors.primary};
  text-align: center;
  font-size: 13px;

  line-height: 1;

  ${props =>
    props.stretch
      ? css`
          border-radius: 10px;
          padding: 0 4px;
        `
      : css`
          border-radius: 50%;
        `};
`;

interface Props {
  count: number;
}
function UnreadBadge({ count, ...props }: Props) {
  return (
    <Badge stretch={count >= 10} {...props}>
      {count}
    </Badge>
  );
}

UnreadBadge.propTypes = {
  count: number.isRequired,
};

export default UnreadBadge;
