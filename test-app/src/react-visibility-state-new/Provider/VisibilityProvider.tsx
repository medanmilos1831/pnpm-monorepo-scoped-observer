import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import type { createBrowserVisibility } from "../createBrowserVisibility";
import { VISIBILITY_STATE } from "../types";

/**
 * React context for providing visibility store to child components.
 * This context allows components to access the visibility store without prop drilling.
 */
const VisibilityContext = createContext<
  ReturnType<typeof createBrowserVisibility> | undefined
>(undefined);

/**
 * Provider component that makes the visibility store available to all child components.
 * This should be placed at the root of your application or at the level where you want
 * to start using visibility state management.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to visibility store
 * @param {ReturnType<typeof createBrowserVisibility>} props.value - The visibility store instance
 *
 * @example
 * ```tsx
 * const visibilityStore = createBrowserVisibility();
 *
 * function App() {
 *   return (
 *     <VisibilityProvider value={visibilityStore}>
 *       <YourComponents />
 *     </VisibilityProvider>
 *   );
 * }
 * ```
 */
const VisibilityProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ReturnType<typeof createBrowserVisibility>;
}) => {
  return (
    <VisibilityContext.Provider value={value}>
      {children}
    </VisibilityContext.Provider>
  );
};

/**
 * Item component that provides visibility state to its children via render prop pattern.
 * This component automatically subscribes to visibility state changes and re-renders
 * when the state changes.
 *
 * @param {Object} props - Component props
 * @param {string} props.name - Unique name for the visibility item
 * @param {VISIBILITY_STATE} [props.initState="close"] - Initial state of the visibility item
 * @param {Function} props.children - Render function that receives visibility state and payload
 *
 * @example
 * ```tsx
 * <VisibilityProvider.Item name="modal" initState="close">
 *   {({ state, payload }) => {
 *     if (state === "open") {
 *       return <div>{payload}</div>;
 *     }
 *     return null;
 *   }}
 * </VisibilityProvider.Item>
 * ```
 */
VisibilityProvider.Item = ({
  initState = VISIBILITY_STATE.CLOSE,
  children,
  name,
}: {
  initState?: `${VISIBILITY_STATE}`;
  children: (props: any) => React.ReactNode;
  name: string;
}) => {
  const { state, payload } = useVisibility(name, initState as VISIBILITY_STATE);
  return <>{children({ state, payload })}</>;
};

/**
 * Hook for accessing visibility state and payload for a specific visibility item.
 * This hook automatically subscribes to state changes and re-renders the component
 * when the visibility state changes.
 *
 * @param {string} name - Unique name of the visibility item
 * @param {VISIBILITY_STATE} initState - Initial state of the visibility item
 * @returns {Object} Object containing current state and payload
 * @returns {VISIBILITY_STATE} returns.state - Current visibility state ("open" or "close")
 * @returns {any} returns.payload - Current payload data associated with the visibility item
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { state, payload } = useVisibility("modal", "close");
 *
 *   return (
 *     <div>
 *       <p>State: {state}</p>
 *       <p>Payload: {JSON.stringify(payload)}</p>
 *     </div>
 *   );
 * }
 * ```
 */
const useVisibility = (name: string, initState: VISIBILITY_STATE) => {
  const value = useContext(VisibilityContext)!;
  const [{ disconnect, subscribe, getState, getPayload }] = useState(() => {
    return value.startEngine(name, initState as VISIBILITY_STATE);
  });
  useEffect(disconnect, []);
  const state = useSyncExternalStore(subscribe, getState);
  return {
    state,
    payload: getPayload(),
  };
};

/**
 * Hook for controlling visibility state of items.
 * Provides methods to open and close visibility items programmatically.
 *
 * @returns {Object} Object containing control methods
 * @returns {Function} returns.open - Function to open a visibility item
 * @returns {Function} returns.close - Function to close a visibility item
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { open, close } = useVisibilityHandler();
 *
 *   return (
 *     <div>
 *       <button onClick={() => open("modal", { title: "My Modal" })}>
 *         Open Modal
 *       </button>
 *       <button onClick={() => close("modal")}>
 *         Close Modal
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
const useVisibilityHandler = () => {
  const value = useContext(VisibilityContext)!;
  return {
    /**
     * Opens a visibility item with optional payload.
     * @param {string} name - Name of the visibility item to open
     * @param {any} [payload] - Optional payload data
     */
    open: (name: string, payload?: any) => {
      value.open(name, payload);
    },
    /**
     * Closes a visibility item.
     * @param {string} name - Name of the visibility item to close
     */
    close: (name: string) => {
      value.close(name);
    },
  };
};

export { VisibilityProvider, useVisibilityHandler, useVisibility };
