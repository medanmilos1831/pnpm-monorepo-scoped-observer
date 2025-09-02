import { useState, useCallback } from "react";

/**
 * Simple toggle hook - no over-engineering!
 */
export const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};

/**
 * Even simpler - just boolean state
 */
export const useBoolean = (initial = false) => {
  const [value, setValue] = useState(initial);
  return [value, setValue] as const;
};
