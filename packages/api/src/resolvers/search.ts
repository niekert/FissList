import { Context, Paging, Savedtrack, Track } from '../types';
import { stringify as stringifyParams } from 'query-string';
interface SearchResults {
  tracks: Paging<Track[]>;
}

export async function search(
  _,
  args: { query: string; offset?: number },
  context: Context,
): Promise<SearchResults> {
  const params = {
    q: args.query,
    type: 'track',
    limit: 30,
    offset: args.offset || 0,
  };

  const { data } = await context.spotify.fetchResource<SearchResults>(
    `/search?${stringifyParams(params)}`,
  );

  return data;
}

export default {
  Query: {
    search,
  },
};
