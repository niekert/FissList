import * as React from 'react';
import { usePlayerQuery } from './usePlayerQuery';
import {
  useSetActiveDeviceMutation,
  useSkipMutation,
  usePlayPauseMutation,
} from './mutations';
import { usePartyContext } from 'scenes/party';
import PlayerContext from './PlayerContext';
import { Playback } from 'globalTypes';
import { useQueuedTracks } from 'scenes/party/queries';
import { useChangedTracks } from 'scenes/party/context/ChangedPartyTracksContext';

interface IProps {
  children: React.ReactNode;
}

export function PlayerContainer({ children }: IProps) {
  const player = usePlayerQuery();
  const party = usePartyContext();
  const queuedTracks = useQueuedTracks(party.id);
  const { setNextActiveTrack } = useChangedTracks();
  const setActiveDevice = useSetActiveDeviceMutation();
  const skipMutation = useSkipMutation();
  const playPauseMutation = usePlayPauseMutation();

  const handleActiveDevice = async (deviceId: string) => {
    await setActiveDevice({
      variables: {
        deviceId,
      },
    });
  };

  const startPlayback = React.useCallback(async () => {
    playPauseMutation(Playback.PLAY, party.id);
  }, []);

  const pausePlayback = React.useCallback(() => {
    playPauseMutation(Playback.PAUSE, party.id);
  }, []);

  React.useEffect(() => {
    return () => {
      playPauseMutation(Playback.PAUSE, party.id);
    };
  }, []);

  const skipTrack = async () => {
    const [nextInQueue] = queuedTracks.data.queuedTracks;
    if (nextInQueue) {
      setNextActiveTrack(nextInQueue.trackId);
    }

    await skipMutation(party.id);
  };

  return (
    <PlayerContext.Provider
      value={{
        ...player,
        setActiveDevice: handleActiveDevice,
        startPlayback,
        pausePlayback,
        skipTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
