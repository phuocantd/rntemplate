import { useRef, useEffect } from 'react';

export function usePrevious(value: any) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
