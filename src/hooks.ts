import { useEffect, useState } from 'react';

export function useScreenWidth() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowSize(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () => setWindowSize(window.innerWidth));
    };
  }, []);

  return windowSize;
}
