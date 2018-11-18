import * as React from 'react';
import useComponentSize from 'use-component-size-typed';
import { FixedSizeList as List } from 'react-window';
import styled from 'styled-components';

const ScrollableList = styled.div`
  flex: 1;
  overflow: hidden;
`;

export type ItemRenderer<T> = (
  data: { style: any; data: T; index: number },
) => React.ReactNode;

interface FlexListProps<T> {
  children: ItemRenderer<T>;
  items: T[];
  itemSize: number;
}

function FlexVirtualizedList<T>({
  children,
  items,
  itemSize,
}: FlexListProps<T>) {
  const listRef = React.useRef<any>(undefined);
  const { height: listHeight } = useComponentSize(listRef);

  const renderTrack = React.useCallback<any>(
    ({ style, index }) => {
      const playlistItem = items[index];
      return children({ style, index, data: playlistItem });
    },
    [listHeight, items, children],
  );

  return (
    <ScrollableList ref={listRef}>
      <List
        key="list"
        height={listHeight || 0}
        itemCount={items.length}
        itemSize={itemSize}
      >
        {renderTrack}
      </List>
    </ScrollableList>
  );
}

export default FlexVirtualizedList;
