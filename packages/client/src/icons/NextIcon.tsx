import * as React from 'react';

interface IProps {
  color?: string;
}

export default function NextIcon({ color, ...props }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}

NextIcon.defaultProps = {
  color: 'currentColor',
};
