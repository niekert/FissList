import * as React from 'react';

interface IProps {
  color?: string;
}

export default function PauseIcon({ color, ...props }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}

PauseIcon.defaultProps = {
  color: 'currentColor',
};
