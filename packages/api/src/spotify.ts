import fetch from 'node-fetch';
import { SpotifyUser } from './types';
import { GraphQLError, graphql } from 'graphql';
import { HttpService } from './types';
import * as camelcase from 'camelcase-keys';
import { AuthenticationError } from 'apollo-server';

export interface Playlist {
  name: string;
  id: string;
  tracks: Paging<PlaylistTrack>;
}

interface Paging<T> {
  href: string;
  limit: number;
  items: T[];
  total: number;
  next?: string;
  previous?: string;
}

export interface PlaylistTrack {
  addedAt: string;
  addedBy: string;
  track: Track;
  images?: Image[];
  isLocal: boolean;
}

export interface Album {
  id: string;
  images: Image[];
}

export interface Image {
  url: string;
  width?: string;
  height?: string;
}

export interface Track {
  id: string;
  uri: string;
  album?: Album;
  images: Image[];
}

export const scopes: string = [
  'user-read-playback-state',
  'user-read-currently-playing',
  'streaming',
  'user-read-birthdate',
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
    })
      .then(resp => resp.json())
      .catch(err => {
        throw new GraphQLError('Ow shit');
      });
  }

  function fetchResource<T>(
    path: string,
    options: any = {},
  ): Promise<{ status: Number; data: T }> {
    return fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        authorization: accessKey,
        ...options.headers,
      },
    }).then(async resp => {
      if (resp.status === 401) {
        throw new AuthenticationError('Unauthenticated.');
      }

      if (resp.status === 204) {
        return {
          data: null,
          status: resp.status,
        };
      }

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
        data: camelcase(data, { deep: true }),
      };
    });
  }

  async function fetchCurrentUser(): Promise<SpotifyUser> {
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
