import { UserInputError } from 'apollo-server';
import { Context, Track } from '../types';

interface QueuedTrack {
  trackId: String;
  track: Track;
  userVotes: string[];
}

async function fetchQueuedTracks(
  {
    partyId,
    offset = 0,
    limit = 50,
  }: { partyId: string; offset?: number; limit?: number },
  context: Context,
): Promise<QueuedTrack[]> {
  // The spotify API only supports fetching tracks in chunks of 50.
  if (limit > 50) {
    throw new UserInputError('Only 50 QueuedTracks can be requested at a time');
  }

  const queuedPartyTracks = await context.prisma
    .party({ id: partyId })
    .queuedTracks({
      first: limit,
      skip: offset,
    });

  const queuedTrackIds = queuedPartyTracks.map(track => track.trackId);

  const { data, status } = await context.spotify.fetchResource<{
    tracks: Track[];
  }>(`/tracks?ids=${queuedTrackIds.join(',')}`);

  return queuedPartyTracks.map((queuedTrack, i) => ({
    trackId: queuedTrack.trackId,
    track: data.tracks[i],
    userVotes: queuedTrack.userVotes,
  }));
}

export default {
  Query: {
    queuedTracks(
      _,
      args: { partyId: string; offset?: number; limit: number },
      context: Context,
    ): Promise<QueuedTrack[]> {
      return fetchQueuedTracks(args, context);
    },
  },
  Party: {
    queuedTracks: (
      partyQuery: { id: string },
      _: unknown,
      context: Context,
    ): Promise<QueuedTrack[]> => {
      return fetchQueuedTracks({ partyId: partyQuery.id }, context);
    },
  },
};
