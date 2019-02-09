import * as React from 'react';
import TimeAgo from 'react-timeago';
import { transparentize } from 'polished';
import styled, { css } from 'styled-components';
import { isTouchDevice } from 'helpers/device';

const Wrapper = styled.div`
  padding: ${props => props.theme.spacing[2]};
  border-bottom: 1px solid
    ${props => transparentize(0.5, props.theme.colors.outline)};
  display: flex;
  cursor: pointer;
  align-items: center;

  :last-child {
    border-bottom: none;
  }

  ${!isTouchDevice &&
    css`
      &:hover {
        background: ${props => props.theme.colors.activeBackground};
      }
    `}
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PartyName = styled.span`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubTitle = styled.span`
  color: ${props => props.theme.textColors.secondary};
  font-size: 14px;
  font-weight: 300;
`;

const LastChanged = styled.time`
  font-size: 12px;
  flex-shrink: 0;
  margin-left: auto;
  color: ${props => props.theme.textColors.secondary};
`;

interface IProps {
  name: string;
  userCount: number;
  updatedAt: string;
  onClick: () => void;
}

function Party({ name, onClick, userCount, updatedAt }: IProps) {
  return (
    <Wrapper onClick={onClick}>
      <MainContent>
        <PartyName>{name}</PartyName>
        {userCount > 0 && (
          <SubTitle>
            {userCount === 1 ? '1 member' : `${userCount} members`}
          </SubTitle>
        )}
      </MainContent>
      <LastChanged dateTime={updatedAt}>
        <TimeAgo date={updatedAt} />
      </LastChanged>
    </Wrapper>
  );
}

export default Party;
