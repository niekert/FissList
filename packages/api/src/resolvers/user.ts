import { Context, SpotifyUser, Party } from '../types';
import { GraphQLError } from 'graphql';

interface Me {
  user: SpotifyUser;
  parties: any;
}

async function me(root, args, context: Context, info): Promise<Me> {
  const user = await context.spotify.fetchCurrentUser();
  const parties = await context.prisma.parties({
    where: { ownerUserId: user.id },
  });

  await context.prisma.$subscribe.party({
    mutation_in: ['UPDATED'],
  });

  return {
    user,
    parties: { ids: parties.map(userParty => userParty.id) },
  };
}

export default {
  Query: {
    me,
  },
};
