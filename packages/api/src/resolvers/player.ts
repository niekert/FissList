import { Context } from '../types';
import { Track } from '../spotify';
import { GraphQLError } from 'graphql';
import { getPermissionForParty, Permissions } from '../permissions';
import { AuthenticationError } from 'apollo-server';

interface PlayerContext {
  uri: string;
  href: string;
}

enum Playback {
  Play = 'PLAY',
  Pause = 'PAUSE',
  Skip = 'SKIP',
}

interface Player {
  device: Device;
  repeatState: string;
  shuffleState: boolean;
  isPlaying: boolean;
  item: Track;
  currentlyPlayingType: string;
  devices: Device[];
  context?: PlayerContext;
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
  if (!data) {
    return null;
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

async function playback(
  _,
  args: { partyId: string; playback: Playback },
  context: Context,
): Promise<boolean> {
  const [me, party, player, queuedTracks] = await Promise.all([
    context.spotify.fetchCurrentUser(),
    context.prisma.party({ id: args.partyId }),
    context.spotify.fetchResource<Player>('/me/player'),
    await context.prisma.party({ id: args.partyId }).queuedTracks(),
  ]);

  const permissions = getPermissionForParty(party, me);
  if (permissions !== Permissions.Admin) {
    throw new AuthenticationError('You are not authorized to do this.');
  }

  if (player.status !== 200) {
    throw new Error('Failed getting player state');
  }

  const [nextInQueue] = queuedTracks;
  if (!nextInQueue) {
    throw new Error('No tracks in the queue fam');
  }

  if (args.playback === Playback.Play) {
    if (player.data.isPlaying && player.data.item.id !== nextInQueue.trackId) {
      await context.spotify.fetchResource('/me/player/play', {
        method: 'PUT',
        body: JSON.stringify({
          uris: [`spotify:track:${nextInQueue.trackId}`],
        }),
      });
    } else {
      await context.spotify.fetchResource('/me/player/play', {
        method: 'PUT',
      });
    }

    return true;
  }

  if (args.playback === Playback.Pause) {
    await context.spotify.fetchResource('/me/player/pause', { method: 'PUT' });
    return true;
  }

  if (args.playback === Playback.Skip) {
    console.log('continuing with playbacl');
    return true;
  }

  return true;
}

export default {
  Mutation: {
    playback,
    setActiveDevice,
  },
  Player: {
    devices,
  },
  Query: {
    player,
  },
};
