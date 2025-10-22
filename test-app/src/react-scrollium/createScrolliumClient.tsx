import {
  createContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";

import { Store } from "./Store";
import { getScrolliumData } from "./utils";
import { ScrolliumAxis, type ScrolliumProps } from "./types";
import { useScroll, useScrollPosition } from "./react-intergation";

const createScrolliumClient = () => {
  const ScrollContext = createContext<{ id: string } | undefined>(undefined);
  const store = new Store();

  return {
    Scroll: ({ children, ...props }: PropsWithChildren<ScrolliumProps>) => {
      const [created, _] = useState(() => {
        return store.createEntity(props);
      });
      useEffect(created, []);
      const elementRef = useRef<HTMLDivElement>(null);
      const scroll = store.getEntity(props.id).client;
      useEffect(() => {
        scroll?.mutations.initializeElement(elementRef.current as HTMLElement);
      }, []);
      useEffect(() => {
        scroll!.mutations.setAxis(props.axis as ScrolliumAxis);
      }, [props.axis]);
      return (
        <ScrollContext.Provider
          value={{
            id: props.id,
          }}
        >
          <div
            ref={elementRef}
            style={{
              height: "100%",
              width: "100%",
              overflow:
                props.axis === ScrolliumAxis.HORIZONTAL
                  ? "auto hidden"
                  : "hidden auto",
            }}
            onScroll={(e) => {
              const scroll = store.getEntity(props.id).client;
              scroll.mutations.setScrollPosition(
                scroll.getters.getAxis() === ScrolliumAxis.VERTICAL
                  ? (e.target as HTMLDivElement).scrollTop
                  : (e.target as HTMLDivElement).scrollLeft
              );
              if (props.onScroll) {
                props.onScroll(getScrolliumData(scroll.getters));
              }
            }}
          >
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
