import { useRef, useEffect } from "react";

/**
 * Custom hook to track if this is the initial render.
 * Useful for avoiding unnecessary updates on first render.
 *
 * @returns boolean indicating if this is the initial render
 */
export function useInitialRender(): boolean {
  const isFirstRenderRef = useRef(true);
  
  useEffect(() => {
    isFirstRenderRef.current = false;
  }, []);
  
  return isFirstRenderRef.current;
}

/**
 * Custom hook to track previous value.
 * Useful for comparing current and previous values.
 *
 * @param value - The value to track
 * @returns The previous value
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}
