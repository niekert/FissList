import * as React from 'react';
import { useTrackQuery } from 'queries';
import styled from 'styled-components';
import posed from 'react-pose';
import ActiveTrack from './ActiveTrack';
import { TrackInfo } from 'fragments/__generated__/TrackInfo';

const PosedWrapper = posed.div({
  active: {
    height: 'auto',
  },
  loading: {
    height: 0,
  },
});

const Wrapper = styled(PosedWrapper)`
  overflow: hidden;
  height: 60px;
  display: flex;
  align-items: center;
  background: white;
  padding: 0 ${props => props.theme.spacing[2]};
`;

interface Props {
  trackId: string;
}

function MemberActiveTrack({ trackId }: Props) {
  const [track, setTrack] = React.useState<TrackInfo | undefined>(undefined);
  const trackQuery = useTrackQuery(trackId);

  React.useEffect(() => {
    if (trackQuery.data.track) {
      setTrack(trackQuery.data.track);
    }
  }, [trackQuery.data.track]);

  return (
    <Wrapper pose={track ? 'active' : 'loading'}>
      {track && <ActiveTrack {...track} />}
    </Wrapper>
  );
}

export default MemberActiveTrack;
