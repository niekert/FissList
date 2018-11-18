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

export async function player(
  root,
  args: { partyid?: string },
  context: Context,
): Promise<Player> {
  let { data } = await context.spotify.fetchResource<Player>('/me/player');
  if (!data) {
    return null;
  }

  if (args.partyid) {
    const party = await context.prisma.party({ id: args.partyid });
    // console.log('data is', data.context);
  }

  // For simplicity in the client merge album and track images
  if (!data.item && data.item.images && data.item.album.images) {
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
  args: {
    type: PlayState;
    contextUri: string;
    offsetUri?: string;
    partyId: string;
  },
  context: Context,
) {
  if (args.type === PlayState.Play) {
    let contextUri = args.contextUri;
    if (!args.contextUri) {
      const party = await context.prisma.party({ id: args.partyId });
      contextUri = `spotify:playlist:${party.playlistId}`;
    }
    const { data, status } = await context.spotify.fetchResource(
      '/me/player/play',
      {
        method: 'PUT',
        body: JSON.stringify({
          context_uri: contextUri,
          offset: args.offsetUri && {
            uri: args.offsetUri,
          },
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

export async function setActiveDevice(
  root,
  args: { deviceId: string },
  context: Context,
) {
  const { status } = await context.spotify.fetchResource('/me/player', {
    method: 'PUT',
    body: JSON.stringify({
      device_ids: [args.deviceId],
    }),
  });

  if (status !== 204) {
    // TODO
    throw new GraphQLError('Failed setting active device');
  }

  // LOL wait for sync for spotify API.
  // FIXME: Don't do this plz
  await new Promise(resolve => setTimeout(resolve, 500));

  return true;
}

export default {
  Mutation: {
    togglePlayState,
    setActiveDevice,
  },
  Player: {
    devices,
  },
  Query: {
    player,
  },
};
