import * as React from 'react';
import posed from 'react-pose';
import styled from 'styled-components';

interface IProps {
  color?: string;
  isActive: boolean;
}

const transition = {
  duration: 100,
};

const PosedPath = posed.path({
  checked: { pathLength: 100, transition, scale: 1 },
  unchecked: {
    pathLength: 0,
    scale: 0.8,
    transition,
  },
});

const Path = styled(PosedPath)`
  transform-origin: 50% 50%;
`;

export default function CheckmarkIcon({ color, isActive, ...props }: IProps) {
  return (
    <svg
      stroke={color}
      strokeWidth={4}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      {...props}
    >
      <Path
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
        pose={isActive ? 'checked' : 'unchecked'}
      />
    </svg>
  );
}

CheckmarkIcon.defaultProps = {
  color: 'currentColor',
};
