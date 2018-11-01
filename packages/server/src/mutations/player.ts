import { Context } from '../types';
import { GraphQLError } from 'graphql';

enum PlayState {
  Play = 'play',
  Pause = 'pause',
  Next = 'next',
  Prev = 'prev',
}

const requestMap = {
  [PlayState.Pause]: ['/me/player/pause', 'PUT'],
  [PlayState.Prev]: ['/me/player/previous', 'POST'],
  [PlayState.Next]: ['/me/player/next', 'POST'],
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

    return status === 204;
  }

  const [path, method] = requestMap[args.type];
  const { status } = await context.spotify.fetchResource(path, {
    method,
  });

  if (status !== 204) {
    throw new GraphQLError(`Invalid request: ${status}`);
  }

  return status === 204;
}
