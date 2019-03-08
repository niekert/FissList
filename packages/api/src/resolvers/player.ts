import { Context } from '../types';
import { Player, Device, DeviceResp } from '../spotify';
import { GraphQLError } from 'graphql';
import { getPermissionForParty, Permissions } from '../permissions';
import { AuthenticationError, PubSub } from 'apollo-server';
import pubsub, { PubsubEvents } from '../pubsub';
import { sortQueuedTracks } from '../helpers';

enum Playback {
  Play = 'PLAY',
  Pause = 'PAUSE',
  Skip = 'SKIP',
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
  const { status, data } = await context.spotify.fetchResource('/me/player', {
    method: 'PUT',
    body: JSON.stringify({
      device_ids: [args.deviceId],
    }),
  });

  if (status !== 204) {
    if (status === 500) {
      console.log('failed because', data);
    }
    throw new GraphQLError(`Failed setting active device (status ${status})`);
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
): Promise<string> {
  const [me, party, player, queuedTracks] = await Promise.all([
    context.spotify.fetchCurrentUser(),
    context.prisma.party({ id: args.partyId }),
    context.spotify.fetchResource<Player>('/me/player'),
    await context.prisma
      .party({ id: args.partyId })
      .queuedTracks()
      .then(sortQueuedTracks),
  ]);

  const permissions = await getPermissionForParty(context.prisma, party, me);
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

  if (args.playback === Playback.Skip) {
    // Remove the track from the play queue
    await context.prisma.updateParty({
      where: { id: party.id },
      data: {
        previouslyPlayedTrackIds: {
          set: [party.activeTrackId, ...party.previouslyPlayedTrackIds],
        },
        activeTrackId: nextInQueue.trackId,
        queuedTracks: {
          delete: {
            id: nextInQueue.id,
          },
        },
      },
    });

    pubsub.publish(PubsubEvents.PartyTracksChanged, {
      partyId: party.id,
      nextActiveTrackId: nextInQueue.trackId,
      addedTrackIds: [],
    });

    // Start playing the new track
    await context.spotify.fetchResource('/me/player/play', {
      method: 'PUT',
      body: JSON.stringify({
        uris: [`spotify:track:${nextInQueue.trackId}`],
      }),
    });

    return nextInQueue.trackId;
  }

  if (args.playback === Playback.Play) {
    if (player.data.item && player.data.item.id === party.activeTrackId) {
      console.log('is already playing, no stress');
      await context.spotify.fetchResource('/me/player/play', {
        method: 'PUT',
      });
      return '';
    }

    await context.spotify.fetchResource('/me/player/play', {
      method: 'PUT',
      body: JSON.stringify({
        uris: [`spotify:track:${party.activeTrackId}`],
      }),
    });
  }

  if (args.playback === Playback.Pause) {
    await context.spotify.fetchResource('/me/player/pause', { method: 'PUT' });
    return '';
  }

  return '';
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
