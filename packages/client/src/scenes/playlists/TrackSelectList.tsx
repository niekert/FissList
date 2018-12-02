import * as React from 'react';
import { useSelectedTracks } from 'context/SelectedTracks';
import ContextUriContext from 'context/ContextUri';
import { PlaylistInfo } from 'fragments/__generated__/PlaylistInfo';
import SelectableTrackListItem from './SelectableTrackListItem';

// TODO: Add support for more generic "TrackFeed"
export function TrackSelectList({ tracks, id }: PlaylistInfo) {
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
