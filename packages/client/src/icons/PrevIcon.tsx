import * as React from 'react';

interface IProps {
  color?: string;
}

export default function PrevIcon({ color, ...props }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
      {...props}
    >
      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}

PrevIcon.defaultProps = {
  color: 'currentColor',
};
