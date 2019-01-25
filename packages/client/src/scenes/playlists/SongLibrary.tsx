import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { SAVED_MUSIC } from 'app-constants';
import Spinner from 'components/Spinner';
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

function SongLibrary() {
  const { loading, data } = useQuery<SavedTracks>(SAVED_SONGS_QUERY);

  if (loading || !data) {
    return <Spinner />;
  }

  return (
    <TrackSelectList
      tracks={{ items: data.savedTracks.items }}
      id={SAVED_MUSIC}
    />
  );
}

export default SongLibrary;
