import { Context } from '../types';
import { GraphQLError } from 'graphql';

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

  return {
    isPlaying: isPlayingAfter,
  };
}
