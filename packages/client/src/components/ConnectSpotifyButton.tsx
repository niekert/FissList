import * as React from 'react';
import { darken } from 'polished';
import SpotifyIcon from 'icons/Spotify';
import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.spotify};
  font-weight: 600;
  margin-top: 16px;
  height: 42px;
  color: white;
  border: none;
  border-radius: 5px;
  outline: none;

  :hover,
  :active,
  :focus {
    background: ${props => darken(0.1, props.theme.colors.spotify)};
  }
`;

const Icon = styled(SpotifyIcon)`
  width: 32px;
  height: 32px;
  margin-right: 8px;
`;

interface IProps {
  onClick: () => void;
}

export default function ConnectSpotifyButton({ onClick }: IProps) {
  return (
    <Button onClick={onClick}>
      <Icon />
      Connect to Spotify
    </Button>
  );
}
