import * as React from 'react';
import Page from 'components/Page';
import styled from 'styled-components';
import SpotifyConnect from 'scenes/spotifyConnect';

const Title = styled.h1`
  text-align: center;
`;

const Intro = styled.p`
  margin-top: 20px;
  text-align: center;
`;

function Landing() {
  return (
    <Page>
      <Title>FissList</Title>
      <Intro>
        FissList allows you to create party playlists that your party guests
        control.
      </Intro>

      <SpotifyConnect />
    </Page>
  );
}

export default Landing;
