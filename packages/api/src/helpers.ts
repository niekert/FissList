import { QueuedTrack } from '../generated/prisma-client/index';

export const sortQueuedTracks = (
  queuedTracks: QueuedTrack[],
  { offset = 0, limit = 50 }: { offset?: number; limit?: number } = {},
): QueuedTrack[] => {
  const sorted = queuedTracks.sort((a, b) => {
    return b.userVotes.length - a.userVotes.length;
  });

  return sorted.slice(offset, offset + limit);
};
