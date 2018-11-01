import { Context, SpotifyUser, Party } from '../types';
import { GraphQLError } from 'graphql';
import { party } from '../queries/party';

interface Me {
  user: SpotifyUser;
  parties: any;
}

export async function me(root, args, context: Context, info): Promise<Me> {
  const user = await context.spotify.fetchCurrentUser();
  const parties = await context.prisma.parties({
    where: { ownerUserId: user.id },
  });

  return {
    user,
    parties: { ids: parties.map(userParty => userParty.id) },
  };
}
