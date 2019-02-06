import * as React from 'react';

export function useControlledState<T = unknown, H = (...args: any) => T>(
  value: T,
  setState: H,
) {
  const [controlledValue, setControlledValue] = React.useState<T>(value);

  if (value === undefined && setState === undefined) {
    return [value, setState];
  }

  return [controlledValue, setControlledValue];
}
