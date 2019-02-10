import * as React from 'react';
import posed from 'react-pose';

const favoriteTransition = {
  type: 'spring',
  stiffness: 220,
  damping: 7,
};

const PosedFavoriteIcon = posed.div({
  active: {
    scale: 1.4,
    transition: favoriteTransition,
  },
  idle: {
    scale: 1,
    transition: favoriteTransition,
  },
});

interface Props {
  children: React.ReactNode;
  isActive: boolean;
  onPoseEnd: () => void;
  duration?: number;
}

function FavoritePose({
  children,
  isActive,
  onPoseEnd,
  duration = 250,
}: Props) {
  React.useEffect(() => {
    if (isActive) {
      const timeout = setTimeout(onPoseEnd, duration);
      return () => clearTimeout(timeout);
    }

    return;
  }, [isActive]);

  return (
    <PosedFavoriteIcon pose={isActive ? 'active' : 'idle'}>
      {children}
    </PosedFavoriteIcon>
  );
}

export default FavoritePose;
