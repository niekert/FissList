import fetch from 'node-fetch';
import { SpotifyUser } from './types';
import { GraphQLError, graphql } from 'graphql';
import * as camelcase from 'camelcase-keys';
import { AuthenticationError } from 'apollo-server';

export interface Playlist {
  name: string;
  id: string;
  tracks: Paging<PlaylistTrack>;
}

interface PlayerContext {
  uri: string;
  href: string;
}

export interface Player {
  device: Device;
  repeatState: string;
  shuffleState: boolean;
  isPlaying: boolean;
  item: Track;
  currentlyPlayingType: string;
  devices: Device[];
  context?: PlayerContext;
}

export interface Device {
  id: string;
  isActive: boolean;
  isPrivateSession: boolean;
  isRestricted: boolean;
  name: string;
  type: string;
  volumePercent: number;
}

export interface DeviceResp {
  devices: Device[];
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

export function makeHttpService(accessKey: string) {
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

  interface FetchRetriesOptions extends Record<string, any> {
    retries: number;
  }

  async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function fetchWithRetries<T>(
    path: string,
    fetchOptions: FetchRetriesOptions = { retries: 5 },
    retriedCount = 0,
  ): Promise<{ status: Number; data: T }> {
    const { retries, options } = fetchOptions;

    console.log('fetching with retries', retriedCount, retries);

    return new Promise(async (resolve, reject) => {
      try {
        const resp = await fetchResource<T>(path, options);
        console.log('REsolved with resp', resp);
        resolve(resp);
      } catch (err) {
        if (retriedCount === retries) {
          reject(err);
          return;
        }

        await wait((retriedCount + 1) * 1000);

        return fetchWithRetries(path, fetchOptions, retriedCount + 1);
      }
    });
  }

  function fetchResource<T>(
    path: string,
    options: any = {},
    retry = 0,
  ): Promise<{ status: Number; data: T }> {
    return fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        authorization: accessKey,
        ...options.headers,
      },
    }).then(async resp => {
      console.log(
        `fetched ${path.substring(0, 50)} with status ${resp.status}`,
      );
      if (resp.status === 401) {
        throw new AuthenticationError('Unauthenticated.');
      }

      if (resp.status === 204) {
        return {
          data: null,
          status: resp.status,
        };
      }

      try {
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
          data: Array.isArray(data) ? data : camelcase(data, { deep: true }),
        };
      } catch (err) {
        // HACKY AF
        return {
          status: resp.status,
          data: null,
        };
      }
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
    fetchWithRetries,
  };
}
