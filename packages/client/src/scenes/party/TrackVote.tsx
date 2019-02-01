import * as React from 'react';
import styled from 'styled-components';
import { ThumbUpIcon, ThumbDownIcon } from 'icons';

interface Props {
  isRequested: boolean;
  voteCount: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: ${props => props.theme.spacing[2]};
  position: relative;
  top: 5px;
  opacity: 0.8;
`;

const VoteCount = styled.span`
  font-size: 12px;
  font-weight: 300;
  line-height: 1.5;
`;

const Icon = styled.svg`
  width: 16p;
  height: 16px;
`;

function TrackVote({ isRequested, voteCount }: Props) {
  return (
    <Wrapper>
      <Icon as={isRequested ? ThumbDownIcon : ThumbUpIcon} />
      <VoteCount>{voteCount}</VoteCount>
    </Wrapper>
  );
}

export default TrackVote;
