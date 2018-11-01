import { Context } from '../types';
import { Track } from '../spotify';

interface Player {
  device: Device;
  repeatState: string;
  shuffleState: boolean;
  isPlaying: boolean;
  item: Track;
  currentlyPlayingType: string;
  devices: Device[];
}

interface Device {
  id: string;
  isActive: boolean;
  isPrivateSession: boolean;
  isRestricted: boolean;
  name: string;
  type: string;
  volumePercent: number;
}

interface DeviceResp {
  devices: Device[];
}

export async function player(root, args, context: Context): Promise<Player> {
  const { data, status } = await context.spotify.fetchResource<Player>(
    '/me/player',
  );

  console.log('data is', data);

  return data;
}

export async function devices(root, args, context: Context): Promise<Device[]> {
  console.log('running devices resolver');
  const { data, status } = await context.spotify.fetchResource<DeviceResp>(
    '/me/player/devices',
  );

  return data.devices;
}
