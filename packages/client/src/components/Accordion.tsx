import * as React from 'react';
import { Card } from 'components/Card';
import UnreadBadge from 'components/UnreadBadge';
import posed, { PoseGroup } from 'react-pose';
import styled, { css } from 'styled-components';
import { AddIcon } from 'icons';

// tslint:disable-next-line
const noop = () => {};

type ContextValue = [string, (itemId: string) => void];
const AccordionContext = React.createContext<ContextValue>(['', noop]);

const PosedAccordionContent = posed.div({
  enter: {
    height: 'auto',
  },
  exit: {
    height: '0',
  },
});

const PosedIcon = posed.div({
  active: {
    transform: 'rotate(45deg) scale(1.1)',
  },
  inactive: {
    transform: 'rotate(0deg) scale(1)',
  },
});

const IconWrapper = styled(PosedIcon)`
  display: flex;
  color: ${props =>
    props.pose === 'active'
      ? props.theme.textColors.primary
      : props.theme.colors.cta};
  align-items: center;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 ${props => props.theme.spacing[2]};
  border-bottom: 1px solid ${props => props.theme.colors.outline};

  &:last-child {
    border-bottom: 0;
  }
`;

const iconCss = css`
  width: 24px;
  height: 24px;
`;

const Title = styled.button`
  padding: 0;
  height: 50px;
  background: none;
  justify-content: space-between;
  outline: none;
  border: none;
  color: ${props =>
    props.isActive
      ? props.theme.textColors.primary
      : props.theme.textColors.active};
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const Content = styled(PosedAccordionContent)`
  overflow: hidden;
`;

interface AccordionProps {
  defaultActiveItem?: string;
  children: React.ReactNode;
}
export function Accordion({
  children,
  defaultActiveItem = '',
}: AccordionProps) {
  const activeItemState = React.useState(defaultActiveItem);

  return (
    <AccordionContext.Provider value={activeItemState}>
      <Card
        css={css`
          padding: 0;
        `}
      >
        {children}
      </Card>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  title: React.ReactNode;
  id: string;
  activityCount?: number;
  children: React.ReactNode;
}

export function AccordionItem({
  title,
  id,
  children,
  activityCount,
}: AccordionItemProps) {
  const [activeItem, setActiveItem] = React.useContext<ContextValue>(
    AccordionContext,
  );
  const isActive = activeItem === id;

  const onClick = () => {
    if (isActive) {
      setActiveItem('');
      return;
    }

    setActiveItem(id);
  };

  return (
    <ItemWrapper pose={isActive ? 'visible' : 'hidden'}>
      <Title onClick={onClick}>
        {title}

        {!!activityCount && activityCount > 0 && (
          <UnreadBadge
            count={activityCount}
            css={css`
              margin-left: ${props => props.theme.spacing[1]};
              margin-right: auto;
              flex-shrink: 0;
            `}
          />
        )}
        <IconWrapper key="add" pose={isActive ? 'active' : 'inactive'}>
          <AddIcon css={iconCss} />
        </IconWrapper>
      </Title>
      <PoseGroup flipMove={false}>
        {id === activeItem && <Content key={id}>{children}</Content>}
      </PoseGroup>
    </ItemWrapper>
  );
}
