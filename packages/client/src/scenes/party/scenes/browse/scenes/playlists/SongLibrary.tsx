import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import Spinner from 'components/Spinner';
import { TrackInfo as TrackInfoType } from 'fragments/__generated__/TrackInfo';
import { TrackInfo } from 'fragments';
import * as React from 'react';
import { TrackSelectList } from './TrackSelectList';
import { SavedTracks } from './__generated__/SavedTracks';

const SAVED_SONGS_QUERY = gql`
  query SavedTracks {
    savedTracks {
      offset
      items {
        addedAt
        track {
          ...TrackInfo
        }
      }
    }
  }

  ${TrackInfo}
`;

export function mapSavedTracks(savedTracks: SavedTracks): TrackInfoType[] {
  return savedTracks.savedTracks.items.map(item => item.track);
}

function SongLibrary() {
  const { loading, data } = useQuery<SavedTracks>(SAVED_SONGS_QUERY);

  if (loading || !data) {
    return <Spinner />;
  }

  return <TrackSelectList tracks={mapSavedTracks(data)} />;
}

export default SongLibrary;
