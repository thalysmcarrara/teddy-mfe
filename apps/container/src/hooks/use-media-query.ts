import { useEffect, useState } from "react";

type LegacyMql = MediaQueryList & {
  addListener?: (listener: (e: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (e: MediaQueryListEvent) => void) => void;
};

export function useMediaQuery(query: string): boolean {
  const getMatches = () =>
    typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined'
      ? window.matchMedia(query).matches
      : false;

  const [matches, setMatches] = useState<boolean>(getMatches);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mql = window.matchMedia(query) as LegacyMql;
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handler);
    } else if (typeof mql.addListener === 'function') {
      mql.addListener(handler);
    }

    setMatches(mql.matches);

    return () => {
      if (typeof mql.removeEventListener === 'function') {
        mql.removeEventListener('change', handler);
      } else if (typeof mql.removeListener === 'function') {
        mql.removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}