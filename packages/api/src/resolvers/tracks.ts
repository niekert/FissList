import { UserInputError } from 'apollo-server';
import { Context, Track } from '../types';
import { sortQueuedTracks } from '../helpers';

interface QueuedTrackDetails {
  trackId: String;
  track: Track;
  userVotes: string[];
}

interface TrackMap {
  [trackId: string]: Track;
}

async function fetchQueuedTracks(
  {
    partyId,
    offset = 0,
    limit = 50,
  }: { partyId: string; offset?: number; limit?: number },
  context: Context,
): Promise<QueuedTrackDetails[]> {
  // The spotify API only supports fetching tracks in chunks of 50.
  if (limit > 50) {
    throw new UserInputError('Only 50 QueuedTracks can be requested at a time');
  }

  const queuedPartyTracks = await context.prisma
    .party({ id: partyId })
    .queuedTracks();

  const sortedTracks = sortQueuedTracks(queuedPartyTracks, { offset, limit });
  const queuedTrackIds = sortedTracks.map(track => track.trackId);

  const { data } = await context.spotify.fetchResource<{
    tracks: Track[];
  }>(`/tracks?ids=${queuedTrackIds.join(',')}`);

  const trackMap = data.tracks.reduce<TrackMap>(
    (result, track) =>
      track
        ? {
            ...result,
            [track.id]: track,
          }
        : result,
    {},
  );

  return (
    sortedTracks
      .map(queuedTrack => ({
        trackId: queuedTrack.trackId,
        track: trackMap[queuedTrack.trackId],
        userVotes: queuedTrack.userVotes,
      }))
      // Filter out any tracks that were not included in spotify resp
      .filter(queuedTrack => !!queuedTrack.track)
  );
}

export default {
  Query: {
    queuedTracks(
      _,
      args: { partyId: string; offset?: number; limit: number },
      context: Context,
    ): Promise<QueuedTrackDetails[]> {
      return fetchQueuedTracks(args, context);
    },
  },
  Party: {
    queuedTracks: (
      partyQuery: { id: string },
      _: unknown,
      context: Context,
    ): Promise<QueuedTrackDetails[]> => {
      return fetchQueuedTracks({ partyId: partyQuery.id }, context);
    },
  },
};
