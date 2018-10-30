import { Context } from '../types';
import { fetchCurrentUser } from '../spotify';

export async function createParty(
  root,
  args: { name: string; basePlaylistId: string },
  context: Context,
) {
  await new Promise(resolve => setTimeout(resolve, 700));
  const user = await fetchCurrentUser(context.accessKey);

  return context.prisma.createParty({
    name: args.name,
    basePlaylistId: args.basePlaylistId,
    ownerUserId: user.id,
  });
}
