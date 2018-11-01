import * as React from 'react';
import { usePlayer } from 'context/player';
import DevicesSelect from './DevicesSelect';

export default function Player() {
  const playerContext = usePlayer();
  if (!playerContext || !playerContext.data || !playerContext.data.player) {
    return null;
  }

  const { player } = playerContext.data;

  return (
    <>
      <DevicesSelect devices={player.devices} />
    </>
  );
}
