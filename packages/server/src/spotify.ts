import fetch from 'node-fetch';
import { SpotifyUser } from './types';
import { GraphQLError } from 'graphql';
import { HttpService } from './types';
import * as camelcase from 'camelcase-keys';

export interface Playlist {
  name: string;
  id: string;
  tracks: Paging<PlaylistTrack>;
}

interface Paging<T> {
  href: string;
  limit: number;
  items: [T];
  total: number;
  next?: string;
  previous?: string;
}

export interface PlaylistTrack {
  addedAt: string;
  addedBy: string;
  track: Track;
  isLocal: boolean;
}

export interface Track {
  uri: string;
}

export const scopes: string = [
  'user-read-playback-state',
  'user-read-currently-playing',
  'user-modify-playback-state',
  'user-read-private',
  'playlist-read-private',
  'playlist-modify-private',
  'user-read-email',
  'user-library-read',
  'user-library-modify',
].join(' ');

const ACCOUNTS_BASE_URL = 'https://accounts.spotify.com/api';
const BASE_URL = 'https://api.spotify.com/v1';

export function makeHttpService(accessKey: string): HttpService {
  function fetchAccountResource<T>(
    path: string,
    options: any = {},
  ): Promise<T> {
    return fetch(`${ACCOUNTS_BASE_URL}${path}`, {
      ...options,
      headers: {
        authorization: accessKey,
        ...options.headers,
      },
    }).then(resp => resp.json());
  }

  function fetchResource<T>(
    path: string,
    options: FetchOp = {},
  ): Promise<{ status: Number; data: T }> {
    return fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        authorization: accessKey,
        ...options.headers,
      },
    }).then(async resp => {
      const data = await resp.json();

      if (resp.status === 401) {
        throw new GraphQLError('Unauthorized request');
      }

      // TODO Also other status codes
      if (resp.status === 400) {
        throw new GraphQLError('Invalid requests: ' + data.error.message);
      }

      return {
        status: resp.status,
        data: camelcase(data),
      };
    });
  }

  async function fetchCurrentUser(): Promise<SpotifyUser> {
    console.log('accessKey', accessKey);
    const { data, status } = await fetchResource<SpotifyUser>('/me');

    if (status === 400) {
      throw new GraphQLError('Invalid request');
    }

    return data;
  }

  return {
    fetchAccountResource,
    fetchResource,
    fetchCurrentUser,
  };
}
