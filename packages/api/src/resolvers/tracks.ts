import { Context, Track } from '../types';

async function queuedTracks(
  _: unknown,
  args: { trackIds: string[] },
  context: Context,
): Promise<Track[]> {
  const { data } = await context.spotify.fetchResource<Track[]>(
    `/tracks?ids=${args.trackIds.join(',')}`,
  );

  return data;
}

export default {
  Query: {
    queuedTracks,
  },
};
