import * as React from 'react';
import Page from 'components/Page';
import styled, { css } from 'styled-components';
import iphone from './iphone.png';
import demo from './demo.mp4';
import SpotifyConnect from 'scenes/spotifyConnect';

const Title = styled.h1`
  text-align: center;
`;

const Intro = styled.p`
  margin-top: 20px;
  text-align: center;
`;

const IphoneBezel = styled.img`
  z-index: 1;
  position: relative;
`;

const Screen = styled.div`
  position: absolute;
  max-width: 100%;
  top: 5%;
  left: 13%;
  max-width: 100%;
  bottom: 14%;
  right: 13%;
`;

const PreviewContent = styled.div`
  margin-top: ${props => props.theme.spacing[3]};
  max-width: 100%;
  position: relative;
`;

function Landing() {
  return (
    <Page>
      <Title>PampaPlay</Title>
      <Intro>
        PampaPlay allows you to create party playlists that your party guests
        control.
      </Intro>
      <SpotifyConnect />

      <PreviewContent>
        <Screen>
          <video
            css={css`
              max-width: 100%;
              max-height: 100%;
            `}
            src={demo}
            autoPlay
            playsInline
          />
        </Screen>
        <IphoneBezel src={iphone} />
      </PreviewContent>
    </Page>
  );
}

export default Landing;
