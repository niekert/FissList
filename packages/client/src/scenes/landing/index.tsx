import * as React from 'react';
import Page from 'components/Page';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
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
  top: 3%;
  left: 13%;
  max-width: 100%;
  bottom: 10%;
  right: 13%;
`;

const PreviewContent = styled.div`
  margin-top: ${props => props.theme.spacing[3]};
  max-width: 100%;
  position: relative;
`;

const PosedPhone = posed.div({
  enter: {
    transform: 'translateY(0px)',
    opacity: 1,
    delay: 400,
    transition: {
      type: 'spring',
    },
  },
  exit: {
    transform: 'translateY(25px)',
    opacity: 0,
    transition: {
      type: 'spring',
    },
  },
});

const DEFAULT_PREVIEW_Y_OFFSET_PX = 100;

function Landing() {
  const animationFrame = React.useRef<number>(-1);
  const [scrollY, setScrollY] = React.useState(window.scrollY);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  React.useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  const previewTranslateY = Math.max(
    0,
    DEFAULT_PREVIEW_Y_OFFSET_PX - scrollY * 0.5,
  );

  return (
    <Page>
      <Title>PampaPlay</Title>
      <Intro>
        Create shared party playlists where your guests decide what is played
        next
      </Intro>
      <SpotifyConnect />

      <PoseGroup animateOnMount={true}>
        <PosedPhone key="phone-preview">
          <PreviewContent
            style={{ transform: `translateY(${previewTranslateY}px)` }}
          >
            <Screen>
              <video
                css={css`
                  max-width: 100%;
                  height: 100%;
                `}
                src={demo}
                autoPlay={true}
                muted={true}
                playsInline={true}
              />
            </Screen>
            <IphoneBezel src={iphone} />
          </PreviewContent>
        </PosedPhone>
      </PoseGroup>
    </Page>
  );
}

export default Landing;
