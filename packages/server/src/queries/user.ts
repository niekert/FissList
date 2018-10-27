import { prisma } from '../generated/prisma-client';
import { fetchResource } from '../spotify';
import { Context } from '../types';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { GraphQLError } from 'graphql';

interface SpotifyUser {
  displayName: string;
  email: string;
  id: string;
  href: string;
  images: [string];
}

export async function getMe(
  root,
  args,
  context: Context,
): Promise<SpotifyUser> {
  const { data, status } = await fetchResource<SpotifyUser>('/me', {
    headers: {
      authorization: context.accessKey,
    },
  });
  console.log('data is', data);

  if (status === 400) {
    throw new GraphQLError('Invalid request');
  }

  return data;
}

export function allUsers(root, args, context: Context) {
  return context.prisma.users();
}
