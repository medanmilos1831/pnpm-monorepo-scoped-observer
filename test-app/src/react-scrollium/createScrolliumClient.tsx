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
      const { mutations, getters } = store.getEntity(props.id);

      useEffect(() => {
        mutations.initializeElement(elementRef.current as HTMLElement);
      }, []);
      useEffect(() => {
        mutations.setAxis(props.axis as ScrolliumAxis);
      }, [props.axis]);

      function onScroll(e: React.UIEvent<HTMLDivElement, UIEvent>) {
        mutations.setScrollPosition(
          getters.getAxis() === ScrolliumAxis.VERTICAL
            ? (e.target as HTMLDivElement).scrollTop
            : (e.target as HTMLDivElement).scrollLeft
        );
        if (props.onScroll) {
          props.onScroll(getScrolliumData(getters));
        }
      }
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
            onScroll={onScroll}
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
