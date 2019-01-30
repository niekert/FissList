import * as React from 'react';
import { useTrackQuery } from 'queries';
import styled from 'styled-components';
import posed from 'react-pose';
import ActiveTrack from './ActiveTrack';

const Wrapper = styled.div`
  overflow: hidden;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 ${props => props.theme.spacing[2]};
`;

interface Props {
  trackId: string;
}

function MemberActiveTrack({ trackId }: Props) {
  const trackQuery = useTrackQuery(trackId);

  return (
    <Wrapper>
      {trackQuery.data.track && <ActiveTrack {...trackQuery.data.track} />}
    </Wrapper>
  );
}

export default MemberActiveTrack;
