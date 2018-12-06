import * as React from 'react';
import posed, { PoseGroup } from 'react-pose';
import styled, { css } from 'styled-components';

const StyledActionList = styled.div`
  border: 2px solid ${props => props.theme.colors.outline};
  border-radius: 3px;
  overflow: hidden;
  position: relative;
`;

const PosedListItem = posed.div({
  enter: {
    transform: 'translateX(0%)',
  },
  exit: {
    transform: 'translateX(100%)',
  },
});

PosedListItem.defaultProps = {
  // withParent: false,
};

export const ActionListGroupTitle = styled(PosedListItem)`
  padding-left: ${props => props.theme.spacing[1]};
  border-bottom: 2px solid ${props => props.theme.colors.outline};
  font-size: 16px;
  font-weight: 600;
`;

export const ListItem = styled(PosedListItem)`
  height: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${props => props.theme.spacing[1]};
  border-bottom: 1px solid ${props => props.theme.colors.outline};

  &:last-child {
    border-bottom: none;
  }
`;

export function ActionListItem({
  label,
  actions,
  ...props
}: {
  label: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <ListItem {...props}>
      <span>{label}</span>
      {actions && (
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {actions}
        </div>
      )}
    </ListItem>
  );
}

export function ActionList({ children }: { children: any }) {
  return (
    <StyledActionList>
      <PoseGroup withParent={false} animateOnMount={false}>
        {children}
      </PoseGroup>
    </StyledActionList>
  );
}
