import { Context, SpotifyUser, Party } from '../types';
import { GraphQLError } from 'graphql';
import { AuthenticationError } from 'apollo-server';

interface Me {
  user: SpotifyUser;
  parties: any;
}

async function me(root, args, context: Context, info): Promise<Me> {
  try {
    const user = await context.spotify.fetchCurrentUser();
    const parties = await context.prisma.parties({
      where: {
        OR: [
          { ownerUserId: user.id },
          { partyUserIds_some: { userId: user.id } },
        ],
      },
      orderBy: 'updatedAt_DESC',
    });

    return {
      user,
      parties: { ids: parties.map(userParty => userParty.id) },
    };
  } catch (err) {
    throw new AuthenticationError(`Unauthenticated: ${err.message}`);
  }
}

export default {
  Query: {
    me,
  },
};
