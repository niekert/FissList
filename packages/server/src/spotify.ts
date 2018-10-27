import fetch from 'node-fetch';
import * as camelcase from 'camelcase-keys';

export const scopes: string = [
  'user-read-playback-state',
  'user-read-currently-playing',
  'user-modify-playback-state',
  'user-read-private',
  'user-read-email',
].join(' ');

const ACCOUNTS_BASE_URL = 'https://accounts.spotify.com/api';
const BASE_URL = 'https://api.spotify.com/v1';

export function fetchAccountResource<T>(path: string, options): Promise<T> {
  return fetch(`${ACCOUNTS_BASE_URL}${path}`, options).then(resp =>
    resp.json(),
  );
}

export function fetchResource<T>(
  path: string,
  options,
): Promise<{ status: Number; data: T }> {
  return fetch(`${BASE_URL}${path}`, options).then(async resp => {
    const data = await resp.json();

    return {
      status: resp.status,
      data: camelcase(data),
    };
  });
}
