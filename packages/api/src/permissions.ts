import { SpotifyUser } from './types';
import { Party } from './generated/prisma-client';

export enum Permissions {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  Pending = 'PENDING',
  None = 'NONE',
}

export const getPermissionForParty = (
  party: Party,
  user: SpotifyUser,
): Permissions => {
  if (party.ownerUserId === user.id) {
    return Permissions.Admin;
  }

  if (party.partyUserIds && party.partyUserIds.includes(user.id)) {
    return Permissions.Member;
  }

  if (party.requestedUserIds && party.requestedUserIds.includes(user.id)) {
    return Permissions.Pending;
  }

  return Permissions.None;
};
