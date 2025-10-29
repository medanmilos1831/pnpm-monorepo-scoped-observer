import { createContext, type PropsWithChildren } from "react";
import { createStore } from "./Store/createStore";

import { type ScrolliumProps } from "./types";
import { useSetup } from "./react-integration/useSetup";

const createScrolliumClient = () => {
  const ScrollContext = createContext<{ id: string } | undefined>(undefined);
  const store = createStore();

  return {
    Scroll: ({ children, ...props }: PropsWithChildren<ScrolliumProps>) => {
      const { elementRef, onScroll, stateManager } = useSetup(store, props);
      return (
        <ScrollContext.Provider
          value={{
            id: props.id,
          }}
        >
          <div
            ref={elementRef}
            style={stateManager.state.style}
            onScroll={onScroll}
          >
            {children}
          </div>
        </ScrollContext.Provider>
      );
    },
    useScroll: (id: string) => {
      // const item = useScroll(store, id);
      // if (!item) {
      //   return undefined;
      // }
      // return item;
    },
    useScrollPosition: () => {
      // return useScrollPosition(store, ScrollContext);
    },
  };
};

export { createScrolliumClient };
