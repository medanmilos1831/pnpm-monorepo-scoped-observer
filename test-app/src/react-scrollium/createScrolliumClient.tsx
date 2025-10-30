import { createContext, type PropsWithChildren } from "react";
import { createStore } from "./Store/createStore";

import { type ScrolliumProps } from "./types";
import { useSetup } from "./react-integration/useSetup";
import { useRequiredContext } from "./react-integration/useRequiredContext";
import { useScroll } from "./react-integration/useScroll";
import { useScrollClient } from "./react-integration/useScrollClient";

const createScrolliumClient = () => {
  const ScrollContext = createContext<{ id: string } | undefined>(undefined);
  const store = createStore();

  return {
    Scroll: ({ children, ...props }: PropsWithChildren<ScrolliumProps>) => {
      const { elementRef, scroll, stateManager } = useSetup(store, props);
      return (
        <ScrollContext.Provider
          value={{
            id: props.id,
          }}
        >
          <div
            ref={elementRef}
            style={stateManager.state.style}
            onScroll={scroll.onScroll}
          >
            {children}
          </div>
        </ScrollContext.Provider>
      );
    },
    useScroll: () => {
      const { id } = useRequiredContext(ScrollContext);
      return useScroll(store, id);
    },
    useScrollClient: (id: string) => {
      return useScrollClient(store, id);
    },
  };
};

export { createScrolliumClient };
