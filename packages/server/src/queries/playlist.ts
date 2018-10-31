import { Context, Paging } from '../types';

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

export async function getPlaylists(root, args: Args, context: Context) {
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
