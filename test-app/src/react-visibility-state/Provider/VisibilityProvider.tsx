import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import type { createBrowserVisibility } from "../createBrowserVisibility";
import { ENGINE_STATE } from "../types";

/**
 * React context for providing visibility engine functionality to components
 *
 * This context holds the browser visibility implementation that provides
 * engine management capabilities throughout the component tree.
 */
const Context = createContext<
  ReturnType<typeof createBrowserVisibility> | undefined
>(undefined);

/**
 * VisibilityProvider component that provides visibility engine functionality to its children
 *
 * This provider component wraps the application and makes the visibility engine
 * available to all child components through React context.
 *
 * @param children - React components that will have access to visibility functionality
 * @param value - Browser visibility implementation instance
 *
 * @example
 * ```tsx
 * <VisibilityProvider value={browserVisibility}>
 *   <App />
 * </VisibilityProvider>
 * ```
 */
const VisibilityProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ReturnType<typeof createBrowserVisibility>;
}) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

/**
 * VisibilityProvider.Item - A render prop component for visibility state management
 *
 * This component provides a clean way to access visibility state and payload
 * through a render prop pattern. It automatically manages the engine lifecycle
 * and provides real-time state updates.
 *
 * @param initState - Initial state of the visibility engine (defaults to OFF)
 * @param children - Render function that receives state and payload
 * @param name - Unique identifier for the visibility engine
 *
 * @example
 * ```tsx
 * <VisibilityProvider.Item name="my-visibility" initState={ENGINE_STATE.OFF}>
 *   {({ state, payload }) => (
 *     <div>
 *       <p>Visibility: {state}</p>
 *       <p>Data: {JSON.stringify(payload)}</p>
 *     </div>
 *   )}
 * </VisibilityProvider.Item>
 * ```
 */
VisibilityProvider.Item = ({
  initState = ENGINE_STATE.OFF,
  children,
  name,
}: {
  initState?: `${ENGINE_STATE}`;
  children: (props: any) => React.ReactNode;
  name: string;
}) => {
  const { state, payload } = useVisibility(name, initState as ENGINE_STATE);
  return <>{children({ state, payload })}</>;
};

/**
 * Hook for accessing visibility state and payload
 *
 * This hook provides a way to subscribe to visibility state changes for a specific
 * engine. It automatically manages the engine lifecycle and provides real-time
 * state updates through React's useSyncExternalStore.
 *
 * @param name - Unique identifier for the visibility engine
 * @param initState - Initial state of the engine
 * @returns Object containing current state and payload
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { state, payload } = useVisibility("my-engine", ENGINE_STATE.OFF);
 *
 *   return (
 *     <div>
 *       <p>Engine state: {state}</p>
 *       <p>Payload: {JSON.stringify(payload)}</p>
 *     </div>
 *   );
 * };
 * ```
 */
const useVisibility = (name: string, initState: `${ENGINE_STATE}`) => {
  const { ensureEngine } = useContext(Context)!;

  // Get engine instance and its methods
  const [{ disconnect, subscribe, getState, getPayload }] = useState(() => {
    return ensureEngine(name, initState as ENGINE_STATE);
  });

  // Cleanup on unmount
  useEffect(disconnect, []);

  // Subscribe to state changes and get current state
  const state = useSyncExternalStore(subscribe, getState);

  return {
    state,
    payload: getPayload(),
  };
};

/**
 * Hook for controlling visibility engine state
 *
 * This hook provides methods to start and stop visibility engines.
 * It's useful for components that need to trigger visibility changes
 * based on user interactions or other events.
 *
 * @returns Object with on/off methods for controlling engines
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { on, off } = useVisibilityHandler();
 *
 *   const handleStart = () => {
 *     on("my-engine", { reason: "user-clicked" });
 *   };
 *
 *   const handleStop = () => {
 *     off("my-engine");
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleStart}>Start Engine</button>
 *       <button onClick={handleStop}>Stop Engine</button>
 *     </div>
 *   );
 * };
 * ```
 */
const useVisibilityHandler = () => {
  const { start, stop } = useContext(Context)!;

  return {
    /**
     * Starts a visibility engine with optional payload data
     * @param name - Engine identifier
     * @param payload - Optional data to associate with the state change
     */
    on: start,

    /**
     * Stops a visibility engine
     * @param name - Engine identifier
     */
    off: stop,
  };
};

export { VisibilityProvider, useVisibilityHandler, useVisibility };
