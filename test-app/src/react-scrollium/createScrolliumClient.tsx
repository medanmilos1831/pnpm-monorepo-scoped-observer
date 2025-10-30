import { createContext, type PropsWithChildren } from "react";
import { createStore } from "./Store/createStore";

import { type ScrolliumProps } from "./types";
import { useSetup } from "./react-integration/useSetup";
import { useRequiredContext } from "./react-integration/useRequiredContext";
import { useScroll } from "./react-integration/useScroll";
import { useScrolliumSelector } from "./react-integration/useScrolliumSelector";

const createScrolliumClient = () => {
  const ScrollContext = createContext<{ id: string } | undefined>(undefined);
  const store = createStore();

  return {
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
    useScrollCommands: () => {
      const { id } = useRequiredContext(ScrollContext);
      return store.getEntity(id).modules.commands;
    },
    useScroll: () => {
      const { id } = useRequiredContext(ScrollContext);
      return useScroll(store, id);
    },
    useScrolliumSelector: (id: string) => {
      return useScrolliumSelector(store, id);
    },
  };
};

export { createScrolliumClient };
