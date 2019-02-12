import { UserInputError } from 'apollo-server';
import { Context, Track } from '../types';
import { sortQueuedTracks } from '../helpers';

interface DetailedTrack extends Track {
  isFavorited: boolean;
}

interface QueuedTrackDetails {
  id: string;
  trackId: string;
  track: DetailedTrack;
  userVotes: string[];
}

interface TrackMap {
  [trackId: string]: DetailedTrack;
}

async function fetchDetailedTracks(
  trackIds: string[],
  context: Context,
): Promise<DetailedTrack[]> {
  const { data: favoritedTracks } = await context.spotify.fetchResource<
    boolean[]
  >(`/me/tracks/contains?ids=${trackIds.join(',')}`);
  const { data: tracks } = await context.spotify.fetchResource<{
    tracks: Track[];
  }>(`/tracks?ids=${trackIds.join(',')}`);

  return tracks.tracks.map((track, index) => ({
    ...track,
    isFavorited: favoritedTracks[index],
  }));
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

  const detailedTracks = await fetchDetailedTracks(queuedTrackIds, context);

  const trackMap = detailedTracks.reduce<TrackMap>(
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
        id: queuedTrack.id,
        trackId: queuedTrack.trackId,
        track: trackMap[queuedTrack.trackId],
        userVotes: queuedTrack.userVotes,
      }))
      // Filter out any tracks that were not included in spotify resp
      .filter(queuedTrack => !!queuedTrack.track)
  );
}

async function track(
  _,
  args: { trackId: string },
  context: Context,
): Promise<Track> {
  const { data } = await context.spotify.fetchResource<Track>(
    `/tracks/${args.trackId}`,
  );

  return data;
}

async function favorite(
  _,
  args: { trackId: string; favorite: boolean },
  context: Context,
): Promise<Boolean> {
  const url = `/me/tracks?ids=${args.trackId}`;
  if (args.favorite) {
    await context.spotify.fetchResource(url, {
      method: 'PUT',
      body: JSON.stringify({
        ids: [args.trackId],
      }),
    });

    return true;
  }

  const { status } = await context.spotify.fetchResource(url, {
    method: 'DELETE',
  });

  return false;
}

async function previousTracks(
  _,
  {
    partyId,
    offset = 0,
    limit = 50,
  }: { partyId: string; offset?: number; limit?: number },
  context: Context,
): Promise<DetailedTrack[]> {
  const party = await context.prisma.party({ id: partyId });
  const trackIds = party.previouslyPlayedTrackIds.slice(offset, offset + limit);

  return fetchDetailedTracks(trackIds, context);
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
    track,
    previousTracks,
  },
  Mutation: {
    favorite,
  },
  Track: {
    async isFavorited(
      root: { id: string; isFavorited: boolean },
      args,
      context: Context,
    ) {
      if (root.isFavorited !== undefined) {
        return root.isFavorited;
      }

      const {
        data: [isFavorited],
      } = await context.spotify.fetchResource<boolean[]>(
        `/me/tracks/contains?ids=${root.id}`,
      );

      return isFavorited;
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
    async activeTrack(
      root: { activeTrackId: string },
      _,
      context: Context,
    ): Promise<Track> {
      const { data: track, status } = await context.spotify.fetchResource<
        Track
      >(`/tracks/${root.activeTrackId}`);

      if (status !== 200) {
        console.error('failed fetching active trck', track);
      }

      return track;
    },
  },
};
