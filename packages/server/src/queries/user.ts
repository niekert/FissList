import { prisma } from '../generated/prisma-client';
import { Context } from '../types';

export function allUsers(root, args, context: Context) {
  return context.prisma.users();
}
