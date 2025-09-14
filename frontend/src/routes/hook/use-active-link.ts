import { useLocation } from '@tanstack/react-router';

export function useActiveLink(path: string, deep = true): boolean {
  const location = useLocation();
  const { pathname } = location;

  if (!path) return false;

  if (deep) {
    // Deep/partial matching - check if pathname starts with path
    return pathname.startsWith(path) || pathname === path;
  } else {
    // Exact matching
    return pathname === path;
  }
}
