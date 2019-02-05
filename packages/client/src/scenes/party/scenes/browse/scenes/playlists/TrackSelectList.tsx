import * as React from 'react';
import { useSelectedTracks } from 'context/SelectedTracks';
import { TrackInfo } from 'fragments/__generated__/TrackInfo';
import SelectableTrackListItem from '../../SelectableTrackListItem';

interface Props {
  tracks: TrackInfo[];
}

export function TrackSelectList({ tracks }: Props) {
  console.log('tracks is', tracks);
  const { toggleTrack, selectedTracks } = useSelectedTracks();

  return (
    <>
      {tracks.map((track, index) => (
        <SelectableTrackListItem
          key={`${track.id}-${index}`}
          track={track}
          onChange={toggleTrack}
          isSelected={selectedTracks.includes(track.id)}
        />
      ))}
    </>
  );
}
