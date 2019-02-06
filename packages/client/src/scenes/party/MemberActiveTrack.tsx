import * as React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import ActiveTrackContainer from './scenes/activeTrack';

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
  partyId: string;
}

function MemberActiveTrack({ trackId, partyId }: Props) {
  return (
    <Wrapper pose={trackId ? 'active' : 'loading'}>
      <ActiveTrackContainer partyId={partyId} />
    </Wrapper>
  );
}

export default MemberActiveTrack;
