import {
  createContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type PropsWithChildren,
} from "react";
import { Store } from "./Store";
import {
  ScrolliumAxis,
  ScrolliumStoreEvents,
  type ScrolliumProps,
} from "../scrollium/types";
import { getScrolliumData } from "./utils";
import { useScroll } from "./react-intergation/hooks/useScroll";
import { useScrollPosition } from "./react-intergation/hooks/useScrollPosition";

const createScrolliumClient = () => {
  const ScrollContext = createContext<{ id: string } | undefined>(undefined);
  const store = new Store();

  // const useScroll = (id: string) => {
  //   const [subscriber] = useState(() => {
  //     return (notify: () => void) => {
  //       return store
  //         .getEntity(id)
  //         .client.subscribe(
  //           `${ScrolliumStoreEvents.CREATE_SCROLLIUM}-${id}`,
  //           notify
  //         );
  //     };
  //   });
  //   const [snapshot] = useState(() => {
  //     return () => store.entities.size;
  //   });
  //   const entity = useSyncExternalStore(subscriber, snapshot);
  //   return entity ? store.getEntity(id).client : undefined;
  // };
  return {
    Scroll: ({ children, ...props }: PropsWithChildren<ScrolliumProps>) => {
      // const context = useContext(ScrolliumClientContext)!;
      // if (!context) {
      //   throw new Error("ScrolliumClientContext not found");
      // }
      const [created, _] = useState(() => {
        return store.createEntity({
          ...props,
          axis: props.axis || ScrolliumAxis.VERTICAL,
        });
      });
      useEffect(created, []);
      const elementRef = useRef<HTMLDivElement>(null);
      const client = useScroll(store, props.id);

      useEffect(() => {
        client?.initializeElement(elementRef.current as HTMLElement);
      }, []);
      useEffect(() => {
        client!.setAxis(props.axis as ScrolliumAxis);
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
              client?.setScrollPosition(
                client.getAxis() === ScrolliumAxis.VERTICAL
                  ? (e.target as HTMLDivElement).scrollTop
                  : (e.target as HTMLDivElement).scrollLeft
              );
              if (props.onScroll) {
                props.onScroll(getScrolliumData(client!));
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
