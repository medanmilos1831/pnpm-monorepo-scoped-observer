import {
  createContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type PropsWithChildren,
} from "react";
import { ScrolliumPublicEvents, type ScrolliumProps } from "./types";
import { scrolliumModule } from "./scrolliumModule";
import { useRequiredContext } from "./react-integration/useRequiredContext";

const createQuantumScrolliumClient = () => {
  const ScrollContext = createContext<{ id: string } | undefined>(undefined);

  return {
    Scroll: ({ children, ...props }: PropsWithChildren<ScrolliumProps>) => {
      scrolliumModule.createModel(props);
      const model = scrolliumModule.getModelById(props.id);
      const elementRef = useRef<HTMLDivElement>(null);
      model.initializeElement(elementRef.current as HTMLElement);
      useEffect(() => {
        let unsubscribe = () => {};
        if (!props.onScroll) return;
        unsubscribe = model.subscribe(
          ScrolliumPublicEvents.ON_SCROLL,
          ({ payload }: { payload: number }) => {
            props.onScroll!(payload);
          }
        );
        return () => {
          unsubscribe();
        };
      });
      return (
        <ScrollContext.Provider
          value={{
            id: props.id,
          }}
        >
          <div ref={elementRef} style={model.style()} onScroll={model.onScroll}>
            {children}
          </div>
        </ScrollContext.Provider>
      );
    },
    useScrollCommands: () => {
      const { id } = useRequiredContext(ScrollContext);
      const model = scrolliumModule.getModelById(id);
      return model.commands;
    },
    useScroll: () => {
      const { id } = useRequiredContext(ScrollContext);
      return useScroll(store, id);
    },
    // useScrolliumSelector: (id: string) => {
    //   return useScrolliumSelector(
    //     {
    //       store,
    //       observer,
    //     },
    //     id
    //   );
    // },
    // getScrolliumClient: (id: string) => {
    //   return store.getters.getEntityById(id).api.getClientEntity();
    // },
  };
};

export { createQuantumScrolliumClient };
