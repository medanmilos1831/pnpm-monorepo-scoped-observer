import { createContext, type PropsWithChildren } from "react";
import { createStore } from "./Store/createStore";

import { type IEntity, type ScrolliumProps } from "./types";
import { useSetup } from "./react-integration/useSetup";
import { useRequiredContext } from "./react-integration/useRequiredContext";
import { useScroll } from "./react-integration/useScroll";
import { useScrolliumSelector } from "./react-integration/useScrolliumSelector";
import { createStoreNew } from "./Store/createStoreNew";

const createScrolliumClient = () => {
  const ScrollContext = createContext<{ id: string } | undefined>(undefined);
  const store = createStore();
  const storeNew = createStoreNew<IEntity>();

  return {
    Scroll: ({ children, ...props }: PropsWithChildren<ScrolliumProps>) => {
      const { elementRef, stateManager, modules } = useSetup(storeNew, props);
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
      return storeNew.getters.getEntityById(id).modules.commands;
    },
    useScroll: () => {
      const { id } = useRequiredContext(ScrollContext);
      return useScroll(storeNew, id);
    },
    useScrolliumSelector: (id: string) => {
      return useScrolliumSelector(storeNew, id);
    },
  };
};

export { createScrolliumClient };
