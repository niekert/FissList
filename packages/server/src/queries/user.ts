import { Context, SpotifyUser } from '../types';
import { GraphQLError } from 'graphql';
import { userPlaylists } from './playlist';

export async function me(root, args, context: Context): Promise<SpotifyUser> {
  return context.spotify.fetchCurrentUser();
}

export async function meList(root, args, context: Context) {
  return {
    id: 'konjo',
    playlist: () => userPlaylists(root, args, context),
  };
}

export function allUsers(root, args, context: Context) {
  return context.prisma.users();
}
