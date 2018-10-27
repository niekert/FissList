import * as React from 'react';
import styled from 'styled-components';
import { Heading, Text } from 'evergreen-ui';
import SpotifyConnect from 'scenes/spotifyConnect';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(Heading)`
  text-align: center;
`;

const Intro = styled(Text)`
  margin-top: 20px;
  text-align: center;
`;

function Landing() {
  return (
    <Wrapper>
      <Title size={900} marginTop="default">
        PartyPlay
      </Title>
      <Intro>
        PartyPlay allows you to create party playlists that your party guests
        control.
      </Intro>
      <SpotifyConnect />
    </Wrapper>
  );
}

export default Landing;
