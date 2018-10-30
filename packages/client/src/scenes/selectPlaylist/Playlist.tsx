import * as React from 'react';

function PlayList() {
  return (
    <Playlist
      initialPose="exit"
      isSelected={playlist.id === selectedPlaylistId}
      i={i - data.getPlaylists!.offset}
      key={playlist.id}
      onClick={() => onClick(playlist.id)}
    >
      {playlist.thumbnail && <Thumbnail src={playlist.thumbnail || ''} />}
      <Content>
        <Title>{playlist.name}</Title>
        <TrackCount>{playlist.tracks.total} tracks</TrackCount>
      </Content>
    </Playlist>
  );
}
