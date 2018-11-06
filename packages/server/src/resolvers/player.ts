import { Context } from '../types';
import { Track } from '../spotify';
import { GraphQLError } from 'graphql';

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
  let { data } = await context.spotify.fetchResource<Player>('/me/player');

  // For simplicity in the client merge album and track images
  if (!data.item.images && data.item && data.item.album.images) {
    data.item.images = data.item.album.images;
  }

  return data;
}

export async function devices(root, args, context: Context): Promise<Device[]> {
  const { data } = await context.spotify.fetchResource<DeviceResp>(
    '/me/player/devices',
  );

  return data.devices;
}

enum PlayState {
  Play = 'play',
  Pause = 'pause',
  Next = 'next',
  Prev = 'prev',
}

interface Map {
  [k: string]: [string, string, boolean];
}

const requestMap: Map = {
  [PlayState.Pause]: ['/me/player/pause', 'PUT', false],
  [PlayState.Prev]: ['/me/player/previous', 'POST', true],
  [PlayState.Next]: ['/me/player/next', 'POST', true],
};

export async function togglePlayState(
  _,
  args: { type: PlayState; uri: string },
  context: Context,
) {
  if (args.type === PlayState.Play) {
    const { data, status } = await context.spotify.fetchResource(
      '/me/player/play',
      {
        method: 'PUT',
        body: JSON.stringify({
          context_uri: `spotify:playlist:${args.uri}`,
        }),
      },
    );
    //FIXME: fetching player state is not update on time. should inv
    await new Promise(resolve => setTimeout(resolve, 500));

    if (status !== 204) {
      throw new GraphQLError(`Invalid request: ${status}`);
    }

    return {
      isPlaying: true,
    };
  }

  const [path, method, isPlayingAfter] = requestMap[args.type];

  const { status } = await context.spotify.fetchResource(path, {
    method,
  });

  if (status !== 204) {
    throw new GraphQLError(`Invalid request: ${status}`);
  }

  //FIXME: fetching player state is not update on time. should inv
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    isPlaying: isPlayingAfter,
  };
}

export default {
  Mutation: {
    togglePlayState,
  },
  Player: {
    devices,
  },
  Query: {
    player,
  },
};