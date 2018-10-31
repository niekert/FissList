import { Context, SpotifyUser } from '../types';
import { GraphQLError } from 'graphql';

export async function me(
  root,
  args,
  context: Context,
): Promise<SpotifyUser> {
  return context.spotify.fetchCurrentUser();
}

export function allUsers(root, args, context: Context) {
  return context.prisma.users();
}
