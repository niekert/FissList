import { useRef, useEffect } from 'react';

export function usePrevious<T = string>(value: T, when?: any[]): T {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  }, when);

  return ref.current;
}
