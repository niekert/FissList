import * as React from 'react';
import styled, { css } from 'styled-components';
import { FavoriteIcon } from 'icons';
import { useTrackVoteMutation } from './mutation';
import IconButton from 'components/IconButton';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: ${props => props.theme.spacing[2]};
  position: relative;
  top: 5px;
  opacity: 0.8;
`;

const VoteCount = styled.span`
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
  margin-right: ${props => props.theme.spacing[1]};
`;

interface Props {
  isRequested: boolean;
  voteCount: number;
  queuedTrackId: string;
}

function TrackVote({ isRequested, voteCount, queuedTrackId }: Props) {
  const mutateTrackVote = useTrackVoteMutation();

  return (
    <Wrapper>
      <VoteCount>{voteCount}</VoteCount>
      <IconButton
        size="extra-small"
        onClick={() => mutateTrackVote(queuedTrackId, isRequested)}
      >
        <FavoriteIcon
          isActive={isRequested}
          css={css`
            width: 16px;
            height: 16px;
          `}
        />
      </IconButton>
    </Wrapper>
  );
}

export default TrackVote;
