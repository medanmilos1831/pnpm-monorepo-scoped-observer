import { createContext, type PropsWithChildren } from "react";
import { Store } from "./Store/Store";
import { useScroll } from "./react-integration/useScroll";
import { useScrollPosition } from "./react-integration/useScrollPosition";
import { useSetup } from "../react-scrollium/react-integration/useSetup";
import { type ScrolliumProps } from "./types";

const createScrolliumClient = () => {
  const ScrollContext = createContext<{ id: string } | undefined>(undefined);
  const store = new Store();

  return {
    Scroll: ({ children, ...props }: PropsWithChildren<ScrolliumProps>) => {
      const { elementRef, onScroll, style } = useSetup(store, props);

      return (
        <ScrollContext.Provider
          value={{
            id: props.id,
          }}
        >
          <div ref={elementRef} style={style} onScroll={onScroll}>
            {children}
          </div>
        </ScrollContext.Provider>
      );
    },
    useScroll: (id: string) => {
      const item = useScroll(store, id);
      if (!item) {
        return undefined;
      }
      return item;
    },
    useScrollPosition: () => {
      return useScrollPosition(store, ScrollContext);
    },
  };
};

export { createScrolliumClient };
