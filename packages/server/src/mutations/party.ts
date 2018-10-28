import { Context } from '../types';
import { fetchCurrentUser } from '../spotify';

export async function createParty(
  root,
  args: { name: string },
  context: Context,
) {
  const user = await fetchCurrentUser(context.accessKey);

  return context.prisma.createParty({
    name: args.name,
    ownerUserId: user.id,
  });
}
