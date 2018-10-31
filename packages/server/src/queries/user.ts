import { Context, SpotifyUser } from '../types';
import { GraphQLError } from 'graphql';
import { playlist } from './playlist';

export async function me(root, args, context: Context): Promise<SpotifyUser> {
  return context.spotify.fetchCurrentUser();
}

export async function meList(root, args, context: Context) {
  return {
    id: 'konjo',
    playlist: () => playlist(root, { id: '4N8ULyTy9d47bSHZrG0bxJ' }, context),
  };
}

export function allUsers(root, args, context: Context) {
  return context.prisma.users();
}
