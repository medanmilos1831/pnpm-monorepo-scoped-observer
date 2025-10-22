import { createContext, type PropsWithChildren } from "react";

import { ScrolliumAxis, type ScrolliumProps } from "./types";
import { getScrolliumData } from "./utils";
import { Store } from "./Store/Store";
import { useSetup } from "./react-intergation/useSetup";
import { useScroll } from "./react-intergation/useScroll";
import { useScrollPosition } from "./react-intergation/useScrollPosition";
const createScrolliumClient = () => {
  const ScrollContext = createContext<{ id: string } | undefined>(undefined);
  const store = new Store();

  return {
    Scroll: ({ children, ...props }: PropsWithChildren<ScrolliumProps>) => {
      const { mutations, getters, elementRef } = useSetup(store, props);

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
