import * as React from 'react';
import styled from 'styled-components';
import useComponentSize from 'use-component-size-typed';
import { transparentize } from 'polished';
import { Spring } from 'react-spring';

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TabLineWrapper = styled.div`
  height: 3px;
  position: absolute;
  bottom: 0;
`;

const ActiveLine = styled.div`
  height: 3px;
  position: absolute;
  background: ${props => props.theme.colors.cta};
`;

const TabsWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: ${props => props.theme.spacing[1]};
`;

const StyledTab = styled.button<{ isActive?: boolean }>`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  ${props => (props.isActive ? props.theme.colors.cta : 'transparent')};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: ${props => transparentize(0, props.theme.colors.cta)};
  }
`;

const noop = () => {};

interface ITabContext {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
  activeTabRef: React.RefObject<any>;
}

const TabContext = React.createContext<ITabContext>({
  activeTab: '',
  setActiveTab: noop,
  activeTabRef: {
    current: null,
  },
});

interface ITabs {
  activeTab: string;
  onChange: (tab: string) => void;
  children: React.ReactNode;
}

interface IPos {
  left: number;
  width: number;
}

export function Tabs({ activeTab, onChange, children }: ITabs) {
  const [lastLinePos, setLastLinePos] = React.useState<IPos>({
    left: 0,
    width: 0,
  });
  const [activeLinePos, setActiveLinePos] = React.useState<IPos>({
    left: 0,
    width: 0,
  });

  const activeTabRef = React.useRef<any>();
  const containerRef = React.useRef<any>();
  const containerSize = useComponentSize(containerRef);

  React.useEffect(
    () => {
      if (containerRef.current && activeTabRef.current) {
        const { left } = containerRef.current!.getBoundingClientRect();
        const {
          left: activeLeft,
        } = activeTabRef.current!.getBoundingClientRect();

        setLastLinePos(activeLinePos);
        setActiveLinePos({
          left: activeLeft - left,
          width: activeTabRef.current!.offsetWidth,
        });
      }
    },
    [containerSize, activeTab],
  );

  return (
    <TabContext.Provider
      value={{ activeTab, setActiveTab: onChange, activeTabRef }}
    >
      <TabsContainer>
        <TabsWrapper ref={containerRef}>{children}</TabsWrapper>
        <TabLineWrapper>
          <Spring from={lastLinePos} to={activeLinePos}>
            {props => <ActiveLine style={props} />}
          </Spring>
        </TabLineWrapper>
      </TabsContainer>
    </TabContext.Provider>
  );
}

export function Tab({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  const { activeTab, setActiveTab, activeTabRef } = React.useContext<
    ITabContext
  >(TabContext!);

  return (
    <StyledTab
      ref={activeTab === name ? activeTabRef : undefined}
      isActive={activeTab === name}
      onClick={() => {
        setActiveTab(name);
      }}
    >
      {children}
    </StyledTab>
  );
}
