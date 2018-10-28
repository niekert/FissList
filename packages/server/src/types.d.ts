import { Prisma } from './generated/prisma-client';

export interface Context {
  prisma: Prisma;
  accessKey?: string;
}

interface Paging<T> {
  href: string;
  items: [T];
  limit: number;
  next: string;
  total: number;
}

interface SpotifyUser {
  displayName: string;
  email: string;
  id: string;
  href: string;
  images: [string];
}
