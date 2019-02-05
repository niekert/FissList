import * as React from 'react';
import styled, { css } from 'styled-components';
import { FavoriteIcon } from 'icons';
import { useTrackVoteMutation } from './mutation';
import IconButton from 'components/IconButton';
import posed, { PoseGroup } from 'react-pose';

const transition = {
  type: 'spring',
};

const PosedCounter = posed.span({
  enter: {
    transform: 'translateY(0%)',
    opacity: 1,
    transition,
  },
  exit: {
    transform: 'translateY(-100%)',
    opacity: 0,
    transition,
  },
  preEnter: {
    transform: 'translateY(100%)',
    opacity: 0,
    transition,
  },
});

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 5px;
  opacity: 0.8;
  padding: ${props => props.theme.spacing[2]};
  padding-left: 0;

  :hover {
    color: ${props => props.theme.textColors.active};
  }
`;

const VoteCount = styled(PosedCounter)`
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
  margin-right: ${props => props.theme.spacing[1]};
`;

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

const StyledFavoriteIcon = styled(FavoriteIcon)`
  cursor: pointer;
  width: 16px;
  height: 16px;
`;

interface Props {
  isRequested: boolean;
  voteCount: number;
  queuedTrackId: string;
}

function TrackVote({ isRequested, voteCount, queuedTrackId }: Props) {
  const mutateTrackVote = useTrackVoteMutation();
  const [isActive, setIsActive] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isActive) {
      const timeout = setTimeout(() => setIsActive(false), 250);
      return () => clearTimeout(timeout);
    }

    return;
  }, [isActive]);

  return (
    <Wrapper
      onClick={() => {
        mutateTrackVote(queuedTrackId, isRequested);

        if (!isRequested) {
          setIsActive(true);
        }
      }}
    >
      <PoseGroup preEnterPose="preEnter" withParent={false}>
        <VoteCount key={voteCount}>{voteCount}</VoteCount>
      </PoseGroup>
      <PosedFavoriteIcon pose={isActive ? 'active' : 'idle'}>
        <IconButton size="extra-small">
          <StyledFavoriteIcon isActive={isRequested} />
        </IconButton>
      </PosedFavoriteIcon>
    </Wrapper>
  );
}

export default TrackVote;
