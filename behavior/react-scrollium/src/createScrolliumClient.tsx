import { createContext, type PropsWithChildren } from "react";
import { useRequiredContext } from "./react-integration/useRequiredContext";
import { useScroll } from "./react-integration/useScroll";
import { useScrolliumSelector } from "./react-integration/useScrolliumSelector";
import { useSetup } from "./react-integration/useSetup";
import { createStore } from "./Store/createStore";
import {
  SCROLLIUM_STORE_SCOPE,
  type IEntity,
  type ScrolliumProps,
} from "./types";
import { createObserver } from "./core/observer";

const createScrolliumClient = () => {
  const ScrollContext = createContext<{ id: string } | undefined>(undefined);
  const store = createStore<IEntity>();
  const observer = createObserver(SCROLLIUM_STORE_SCOPE);

  return {
    Scroll: ({ children, ...props }: PropsWithChildren<ScrolliumProps>) => {
      const { elementRef } = useSetup(store, props);
      const getters = store.getters.getEntityById(props.id)!.api.getGetters();
      const scroll = store.getters.getEntityById(props.id)!.api.getScroll();

      return (
        <ScrollContext.Provider
          value={{
            id: props.id,
          }}
        >
          <div
            ref={elementRef}
            style={getters.getStyle()}
            onScroll={scroll.onScroll}
          >
            {children}
          </div>
        </ScrollContext.Provider>
      );
    },
    useScrollCommands: () => {
      const { id } = useRequiredContext(ScrollContext);
      return store.getters.getEntityById(id).api.getCommands();
    },
    useScroll: () => {
      const { id } = useRequiredContext(ScrollContext);
      return useScroll(store, id);
    },
    useScrolliumSelector: (id: string) => {
      return useScrolliumSelector(
        {
          store,
          observer,
        },
        id
      );
    },
    getScrolliumClient: (id: string) => {
      return store.getters.getEntityById(id).api.getClientEntity();
    },
  };
};

export { createScrolliumClient };
