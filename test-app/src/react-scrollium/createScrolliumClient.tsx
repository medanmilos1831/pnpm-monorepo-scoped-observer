import {
  createContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { useScroll } from "./react-intergation/hooks/useScroll";
import { useScrollPosition } from "./react-intergation/hooks/useScrollPosition";
import { Store } from "./Store";
import { createClient, getScrolliumData } from "./utils";
import { ScrolliumAxis, type ScrolliumProps } from "./types";

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
        scroll?.initializeElement(elementRef.current as HTMLElement);
      }, []);
      useEffect(() => {
        scroll!.setAxis(props.axis as ScrolliumAxis);
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
              scroll?.setScrollPosition(
                scroll.getAxis() === ScrolliumAxis.VERTICAL
                  ? (e.target as HTMLDivElement).scrollTop
                  : (e.target as HTMLDivElement).scrollLeft
              );
              if (props.onScroll) {
                props.onScroll(getScrolliumData(createClient(scroll)));
              }
            }}
          >
            {children}
          </div>
        </ScrollContext.Provider>
      );
    },
    useScroll: (id: string) => {
      return useScroll(store, id);
    },
    useScrollPosition: () => {
      return useScrollPosition(store);
    },
  };
};

export { createScrolliumClient };
