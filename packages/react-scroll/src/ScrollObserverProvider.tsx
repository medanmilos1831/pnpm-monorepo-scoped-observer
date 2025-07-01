import { createContext, PropsWithChildren, useContext } from 'react';

/**
 * Context used to provide ScrollObserver-related data (name and IntersectionObserver instance).
 */
const ScrollObserverContext = createContext<
  | {
      /**
       * Unique name of the ScrollObserver instance.
       */
      name: string;

      /**
       * Optional IntersectionObserver used to track waypoint visibility.
       */
      waypointObserver: IntersectionObserver | undefined;
    }
  | undefined
>(undefined);

/**
 * Provider component that sets up the ScrollObserver context.
 *
 * Must wrap any components that intend to use the `useScrollObserver` hook.
 *
 * @param {string} name - Unique identifier for this ScrollObserver.
 * @param {IntersectionObserver | undefined} waypointObserver - The IntersectionObserver instance for waypoints.
 * @param {React.ReactNode} children - Child components that will consume the context.
 */
const ScrollObserverProvider = ({
  children,
  name,
  waypointObserver,
}: PropsWithChildren<{
  name: string;
  waypointObserver: IntersectionObserver | undefined;
}>) => {
  return (
    <ScrollObserverContext.Provider value={{ name, waypointObserver }}>
      {children}
    </ScrollObserverContext.Provider>
  );
};

/**
 * Custom hook to access the ScrollObserver context.
 *
 * @returns {{ name: string; waypointObserver: IntersectionObserver | undefined }} - The ScrollObserver context value.
 *
 * @throws Will throw an error if used outside of a `<ScrollObserverProvider>`.
 */
const useScrollObserver = () => {
  const ctx = useContext(ScrollObserverContext);
  if (!ctx) {
    throw new Error(
      '[ScrollObserver] useScrollObserver must be used within a <ScrollObserverProvider>.'
    );
  }
  return ctx;
};

export { ScrollObserverProvider, useScrollObserver };
