import { Context } from '../types';
import { Track, Playlist } from '../spotify';
import { GraphQLError } from 'graphql';

interface PlayerContext {
  uri: string;
  href: string;
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

async function fetchPlaylistContext(
  playerContext: PlayerContext,
  context: Context,
) {
  if (playerContext && playerContext.uri) {
    const ids = playerContext.uri.split(':');
    if (ids.includes('playlist')) {
      const playlistId = ids[ids.length - 1];
      const [party] = await context.prisma.parties({ where: { playlistId } });
      if (party) {
        const playlist = await context.spotify.fetchResource<Playlist>(
          `/playlists/${playlistId}`,
        );

        return {
          party,
          playlist,
        };
      }
    }
  }
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

  const playerContext = await fetchPlaylistContext(data.context, context);
  if (playerContext && data.item) {
    const { party, playlist } = playerContext;

    const trackIndex = playlist.data.tracks.items.findIndex(
      track => track.track.id === data.item.id,
    );

    await context.prisma.updateParty({
      where: { id: party.id },
      data: {
        activeTrackIndex: trackIndex,
      },
    });
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
