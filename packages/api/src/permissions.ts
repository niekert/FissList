import { SpotifyUser } from './types';
import { Party, Prisma } from './generated/prisma-client';

export enum Permissions {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  Pending = 'PENDING',
  None = 'NONE',
}

export const getPermissionForParty = async (
  prisma: Prisma,
  party: Party,
  user: SpotifyUser,
): Promise<Permissions> => {
  if (party.ownerUserId === user.id) {
    return Permissions.Admin;
  }

  const partyMembers = await prisma
    .party({ id: party.id })
    .partyUserIds({ where: { userId: user.id } });

  if (partyMembers.length > 0) {
    return Permissions.Member;
  }

  const requestedUserIds = await prisma
    .party({ id: party.id })
    .requestedUserIds({ where: { userId: user.id } });

  if (requestedUserIds.length > 0) {
    return Permissions.Pending;
  }

  return Permissions.None;
};
