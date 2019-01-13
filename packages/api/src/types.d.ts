import { Prisma } from './generated/prisma-client';
import { Playlist } from './spotify';
import { PubSub } from 'graphql-yoga';

export interface Context {
  prisma: Prisma;
  spotify: HttpService;
  pubsub: PubSub;
}

interface HttpService {
  fetchAccountResource: <T>(path: string, options?: any) => Promise<T>;
  fetchResource: <T>(
    path: string,
    options?: any,
  ) => Promise<{ status: Number; data: T }>;
  fetchCurrentUser: () => Promise<SpotifyUser>;
}

interface Paging<T> {
  href: string;
  items: [T];
  limit: number;
  next: string;
  total: number;
}

interface Party {
  id: string;
  playlistId: string;
  playlist: Playlist;
}

interface SpotifyUser {
  displayName: string;
  email: string;
  id: string;
  href: string;
  images: [string];
}

export interface Track {
  name: string;
  id: string;
}
