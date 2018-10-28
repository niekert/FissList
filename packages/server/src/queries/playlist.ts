import { Context, Paging } from '../types';
import { fetchResource } from '../spotify';

interface Playlist {
  id: string;
  href: string;
  name: string;
}

export async function getPlaylists(root, args, context: Context) {
  const { data, status } = await fetchResource<Paging<Playlist>>(
    '/me/playlists?limit=30',
    context.accessKey,
  );

  console.log('data is', data);

  return data;
}
