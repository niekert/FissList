import { Context, Paging, Savedtrack } from '../types';

interface Image {
  url: string;
  width: number;
  height: number;
}

interface Tracks {
  href: string;
  total: number;
}

interface Args {
  offset?: number;
}

interface Playlist {
  id: string;
  href: string;
  name: string;
  images: [Image];
  tracks: Tracks;
}

async function userPlaylists(root, args: Args, context: Context) {
  await new Promise(resolve => setTimeout(resolve, 700));
  const { data, status } = await context.spotify.fetchResource<
    Paging<Playlist>
  >(`/me/playlists?limit=15&offset=${args.offset || 0}`);

  return {
    ...data,
    items: data.items.map(playlist => {
      const thumbnail = playlist.images.find(
        image =>
          (image.width === 60 && image.height === 60) ||
          (image.width === null && image.height === null),
      );

      return {
        ...playlist,
        thumbnail: thumbnail && thumbnail.url,
      };
    }),
  };
}

async function playlist(
  root: { playlistId: string },
  args: { id: string },
  context: Context,
) {
  const { data } = await context.spotify.fetchResource<Playlist>(
    `/playlists/${args.id || root.playlistId}`,
  );

  return data;
}

async function savedTracks(
  root,
  args,
  context: Context,
): Promise<Paging<Savedtrack>> {
  // TODO: support pagination
  const { data } = await context.spotify.fetchResource<Paging<Savedtrack>>(
    '/me/tracks?limit=50',
  );

  return data;
}

export default {
  Query: {
    playlist,
    userPlaylists,
    savedTracks,
  },
};
