import get from 'lodash.get';
import { PlayerContextValue } from 'context/player';

export function getCurrentTrackId(
  player: PlayerContextValue,
): string | undefined {
  return get(player, 'data.player.item.id');
}
