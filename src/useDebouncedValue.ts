import { useEffect, useState } from 'react';

export default function useDebouncedValue<T>(value: T, delayMS: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Cancel the timeout if value changes (also on delay change or unmount)
  // This is how we prevent debounced value from updating if value is changed
  // within the delay period. Timeout gets cleared and restarted.
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delayMS);
    return () => clearTimeout(handler);
  }, [value, delayMS]); // Only re-call effect if value or delay changes

  return debouncedValue;
}
