import { EffectCallback, useEffect, useRef } from 'react';

export function useDidMount(callback: EffectCallback) {
  const hasMount = useRef(false);

  useEffect(() => {
    if (!hasMount.current) {
      callback();
    }
    hasMount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
