import * as React from 'react';
import { tween, styler, easing } from 'popmotion';
import { blissfulAnimation } from './animations';
import { Ghost } from 'react-kawaii';

interface Props {
  size?: number;
  color?: string;
  mood?: 'happy' | 'blissful';
}

function MovingGhost({
  color = '#83D1FB',
  size = 180,
  mood = 'blissful',
  ...props
}: Props) {
  const ghostRef = React.useRef<any>(undefined);

  React.useEffect(
    () => {
      if (!ghostRef.current) {
        return;
      }

      const body = styler(ghostRef.current.querySelector('svg'), {});

      tween({
        from: { y: 10 },
        to: { y: 20 },
        ease: easing.easeOut,
        duration: 1500,
        yoyo: Infinity,
      }).start(body.set);

      if (mood === 'blissful') {
        const animation = blissfulAnimation(ghostRef.current).start();
        return () => {
          if (animation.stop) {
            animation.stop();
          }
        };
      }
      return;
    },
    [ghostRef.current, mood],
  );

  return (
    <div ref={ghostRef} {...props}>
      <Ghost color={color} size={size} mood={mood} />
    </div>
  );
}

export default MovingGhost;
