import { Prisma } from './generated/prisma-client';
import { Playlist } from './spotify';
import { PubSub } from 'graphql-yoga';
import { makeHttpService } from './spotify';

export interface Context {
  prisma: Prisma;
  spotify: ReturnType<typeof makeHttpService>;
  pubsub: PubSub;
}

interface Paging<T> {
  href: string;
  items: T[];
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

export interface Savedtrack {
  addedAt: string;
  track: Track;
}
