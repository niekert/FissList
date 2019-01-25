import * as React from 'react';
import { useSelectedTracks } from 'context/SelectedTracks';
import ContextUriContext from 'context/ContextUri';
import { TrackInfo } from 'fragments/__generated__/TrackInfo';
import { PlaylistInfo_tracks_items } from 'fragments/__generated__/PlaylistInfo';
import { SavedTracks_savedTracks_items } from './__generated__/SavedTracks';
import SelectableTrackListItem from './SelectableTrackListItem';

interface PlaylistTrack {
  addedAt: string;
  track: TrackInfo;
}

interface Props {
  id: string;
  tracks: {
    items: PlaylistTrack[];
  };
}

// TODO: Add support for more generic "TrackFeed"
export function TrackSelectList({ tracks, id }: Props) {
  const { toggleTrack, selectedTracks } = useSelectedTracks();

  return (
    <ContextUriContext.Provider value={`spotify:playlist:${id}`}>
      {tracks.items.map(data => (
        <SelectableTrackListItem
          key={`${data.addedAt}-${data.track.id}`}
          {...data}
          onChange={toggleTrack}
          isSelected={selectedTracks.includes(data.track.id)}
        />
      ))}
    </ContextUriContext.Provider>
  );
}
