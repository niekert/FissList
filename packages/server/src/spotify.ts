import fetch from 'node-fetch';

export const scopes: string = [
  'user-read-playback-state',
  'user-read-currently-playing',
  'user-modify-playback-state',
  'user-read-private',
  'user-read-email',
].join(' ');

const BASE_URL = 'https://accounts.spotify.com/api';

export function fetchResource<T>(path: string, options): Promise<T> {
  return fetch(`${BASE_URL}${path}`, options).then(resp => resp.json());
}
