import { fetchCurrentUser } from '../spotify';
import { Context, SpotifyUser } from '../types';
import { GraphQLError } from 'graphql';

export async function getMe(
  root,
  args,
  context: Context,
): Promise<SpotifyUser> {
  return fetchCurrentUser(context.accessKey);
}

export function allUsers(root, args, context: Context) {
  return context.prisma.users();
}
