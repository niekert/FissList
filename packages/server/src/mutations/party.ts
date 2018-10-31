import { Context } from '../types';

export async function createParty(
  root,
  args: { name: string; basePlaylistId: string },
  context: Context,
) {
  await new Promise(resolve => setTimeout(resolve, 700));
  const user = await context.spotify.fetchCurrentUser();

  return context.prisma.createParty({
    name: args.name,
    basePlaylistId: args.basePlaylistId,
    ownerUserId: user.id,
  });
}
