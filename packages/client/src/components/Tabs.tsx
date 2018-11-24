import * as React from 'react';
import styled from 'styled-components';
import useComponentSize from 'use-component-size-typed';
import { Spring } from 'react-spring';
import { transparentize } from 'polished';

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TabLineWrapper = styled.div`
  height: 2px;
  position: absolute;
  bottom: 0;
  overflow: hidden;
  width: 100%;
`;

const ActiveLine = styled.div`
  height: 2px;
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
  min-height: 42px;
  background-color: ${props =>
    props.isActive ? transparentize(0.95, props.theme.colors.cta) : 'white'};
  color: ${props =>
    props.isActive
      ? props.theme.textColors.active
      : props.theme.textColors.primary};
  transition: background-color 0.3s ease-in;
  border: none;
  outline: none;
  font-weight: 600;
  cursor: pointer;
`;

// tslint:disable-next-line
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

  const activeTabRef = React.useRef<any>(undefined);
  const containerRef = React.useRef<any>(undefined);
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
