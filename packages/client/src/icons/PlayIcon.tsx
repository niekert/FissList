import * as React from 'react';

interface IProps {
  color?: string;
}

export default function PlayIcon({ color, ...props }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M8 5v14l11-7z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}

PlayIcon.defaultProps = {
  color: 'currentColor',
};
