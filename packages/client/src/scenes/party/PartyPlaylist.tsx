import * as React from 'react';
import ContextUriContext from 'context/ContextUri';
import { usePlayer } from 'context/player';
import { PlaylistInfo } from 'fragments/__generated__/PlaylistInfo';
import PartyTrack from './PartyTrack';

type Props = PlaylistInfo & {
  partyId: string;
  activeTrackIndex?: number;
};

function PartyPlaylist({ tracks, partyId, id, activeTrackIndex }: Props) {
  const player = usePlayer();

  const playTrack = trackId => {
    player!.togglePlayState({
      type: 'play',
      partyId,
      offsetUri: `spotify:track:${trackId}`,
    });
  };

  return (
    <ContextUriContext.Provider value={`spotify:playlist:${id}`}>
      {tracks.items.map((item, index) => (
        <PartyTrack
          {...item}
          key={`${item.addedAt}-${item.track.id}`}
          isActive={activeTrackIndex === index}
          playTrack={playTrack}
        />
      ))}
    </ContextUriContext.Provider>
  );
}

export default PartyPlaylist;
