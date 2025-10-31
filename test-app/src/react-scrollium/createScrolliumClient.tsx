import { createContext, type PropsWithChildren } from "react";
import { useRequiredContext } from "./react-integration/useRequiredContext";
import { useScroll } from "./react-integration/useScroll";
import { useScrolliumSelector } from "./react-integration/useScrolliumSelector";
import { useSetup } from "./react-integration/useSetup";
import { createStore } from "./Store/createStore";
import { type IEntity, type ScrolliumProps } from "./types";

/**
 * Creates a scrollium client with React components and hooks.
 * 
 * Provides a factory function that creates a scroll tracking system with:
 * - Scroll component for wrapping scrollable content
 * - Hooks for accessing scroll state and commands
 * - External selector for cross-component access
 * 
 * Each client instance has its own store for managing multiple scroll instances.
 * 
 * @returns Scrollium client with Scroll component and hooks
 * 
 * @example
 * ```tsx
 * const { Scroll, useScroll, useScrollCommands, useScrolliumSelector } = createScrolliumClient();
 * 
 * // Inside component
 * <Scroll id="scroll-one" axis="vertical" onScroll={(params) => {...}}>
 *   {children}
 * </Scroll>
 * 
 * // Access scroll state
 * const scroll = useScroll();
 * const commands = useScrollCommands();
 * 
 * // External access (any component)
 * const client = useScrolliumSelector("scroll-one");
 * ```
 */
const createScrolliumClient = () => {
  const ScrollContext = createContext<{ id: string } | undefined>(undefined);
  const store = createStore<IEntity>();

  return {
    /**
     * Scroll component that wraps content and tracks scroll events.
     * 
     * Automatically initializes entity, sets up event handlers, and manages
     * scroll tracking state. Applies overflow styles based on axis.
     * 
     * @param props - Scrollium configuration props
     * @param props.id - Unique identifier for this scroll instance
     * @param props.axis - Scroll direction (vertical or horizontal)
     * @param props.onScroll - Optional callback fired on scroll events
     * @param children - React children to render inside scrollable container
     */
    Scroll: ({ children, ...props }: PropsWithChildren<ScrolliumProps>) => {
      const { elementRef, stateManager, modules } = useSetup(store, props);
      return (
        <ScrollContext.Provider
          value={{
            id: props.id,
          }}
        >
          <div
            ref={elementRef}
            style={stateManager.state.style}
            onScroll={modules.scroll.onScroll}
          >
            {children}
          </div>
        </ScrollContext.Provider>
      );
    },
    /**
     * Hook to access scroll commands API from within Scroll component tree.
     * 
     * Provides programmatic control over scroll position:
     * - scrollTo(options) - Scroll to specific position
     * - scrollToStart(options) - Scroll to beginning
     * - scrollToEnd(options) - Scroll to end
     * 
     * @returns Commands object with scroll control methods
     * 
     * @example
     * ```tsx
     * const commands = useScrollCommands();
     * commands.scrollToEnd({ behavior: "smooth" });
     * ```
     */
    useScrollCommands: () => {
      const { id } = useRequiredContext(ScrollContext);
      return store.getters.getEntityById(id).modules.commands;
    },
    /**
     * Hook to access scroll state from within Scroll component tree.
     * 
     * Uses React's useSyncExternalStore for concurrent-safe state access.
     * Returns reactive scroll state (position, progress, direction, etc.).
     * 
     * @returns Scroll state object with current scroll metrics
     * 
     * @example
     * ```tsx
     * const scroll = useScroll();
     * console.log(scroll.progress); // 0-100
     * console.log(scroll.isScrolling); // boolean
     * ```
     */
    useScroll: () => {
      const { id } = useRequiredContext(ScrollContext);
      return useScroll(store, id);
    },
    /**
     * Hook to access scroll state from outside Scroll component tree.
     * 
     * Enables cross-component access to any scroll instance by ID.
     * Useful for external components that need to react to scroll changes.
     * 
     * @param id - The scroll instance ID to access
     * @returns Scroll state object or undefined if instance doesn't exist
     * 
     * @example
     * ```tsx
     * // In component outside Scroll tree
     * const client = useScrolliumSelector("scroll-one");
     * useEffect(() => {
     *   client?.addEventListener("onScroll", (params) => {
     *     console.log("External scroll event", params);
     *   });
     * }, [client]);
     * ```
     */
    useScrolliumSelector: (id: string) => {
      return useScrolliumSelector(store, id);
    },
  };
};

export { createScrolliumClient };
