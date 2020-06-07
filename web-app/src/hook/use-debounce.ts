import { useState, useEffect } from 'react';

const useDebounce = <T extends any>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return (): void => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
