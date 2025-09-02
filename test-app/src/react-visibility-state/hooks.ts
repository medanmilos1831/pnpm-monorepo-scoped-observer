import { useEffect, useRef } from "react";

/**
 * Hook that tracks whether the current render is the initial one
 * Useful for preventing certain operations on subsequent re-renders
 * @returns Boolean indicating if this is the initial render
 */
export const useInitialRender = () => {
  // Track initial render state
  const isInitialRender = useRef(true);

  // Mark as not initial after first render
  useEffect(() => {
    isInitialRender.current = false;
  }, []);

  return isInitialRender.current;
};
