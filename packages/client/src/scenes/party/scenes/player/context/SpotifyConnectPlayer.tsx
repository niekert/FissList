import * as React from 'react';
import { usePlayerQuery } from './usePlayerQuery';
import { useSetActiveDeviceMutation, usePlaybackMutation } from './mutations';
import { usePartyContext } from 'scenes/party';
import PlayerContext from './PlayerContext';
import { Playback } from 'globalTypes';
import { useQueuedTracks } from 'scenes/party/queries';

interface IProps {
  children: React.ReactNode;
}

const REFETCH_INTERVAL_MS = 200;

export function PlayerContainer({ children }: IProps) {
  const player = usePlayerQuery();
  const party = usePartyContext();
  const queuedTracks = useQueuedTracks(party.id);
  const [refetchTimeout, setRefetchTimeout] = React.useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const setActiveDevice = useSetActiveDeviceMutation();
  const mutatePlayback = usePlaybackMutation();

  const handleActiveDevice = async (deviceId: string) => {
    await setActiveDevice({
      variables: {
        deviceId,
      },
    });
  };

  const startPlayback = React.useCallback(async () => {
    await mutatePlayback({
      variables: {
        partyId: party.id,
        playback: Playback.PLAY,
      },
    });

    setRefetchTimeout(setTimeout(() => player.refetch(), REFETCH_INTERVAL_MS));
  }, [setRefetchTimeout]);

  const pausePlayback = React.useCallback(() => {
    mutatePlayback({
      variables: {
        partyId: party.id,
        playback: Playback.PAUSE,
      },
    });

    setRefetchTimeout(setTimeout(() => player.refetch(), REFETCH_INTERVAL_MS));
  }, [setRefetchTimeout]);

  React.useEffect(() => {
    return () => {
      if (refetchTimeout) {
        return clearTimeout(refetchTimeout);
      }
    };
  }, [refetchTimeout]);

  React.useEffect(() => {
    return () => {
      mutatePlayback({
        variables: {
          partyId: party.id,
          playback: Playback.PAUSE,
        },
      });
    };
  }, []);

  const skipTrack = React.useCallback(async () => {
    const [nextInQueue] = queuedTracks.data.queuedTracks;
    await mutatePlayback({
      variables: {
        partyId: party.id,
        playback: Playback.SKIP,
      },
      optimisticResponse: {
        playback: nextInQueue ? nextInQueue.trackId : '',
      },
    });

    setRefetchTimeout(setTimeout(() => player.refetch(), REFETCH_INTERVAL_MS));
  }, [setRefetchTimeout]);

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
