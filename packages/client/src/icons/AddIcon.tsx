import * as React from 'react';

interface IProps {
  color?: string;
}

export default function AddIcon({ color, ...props }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}

AddIcon.defaultProps = {
  color: 'currentColor',
};
