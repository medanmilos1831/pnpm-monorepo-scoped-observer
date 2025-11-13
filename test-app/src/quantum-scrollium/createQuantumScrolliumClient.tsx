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
      useEffect(() => {
        model.initializeElement(elementRef.current as HTMLElement);
      }, []);
      useEffect(() => {
        let unsubscribe = () => {};
        if (!props.onScroll) return;
        unsubscribe = model.subscribe(
          ScrolliumPublicEvents.ON_SCROLL,
          ({ payload }: { payload: any }) => {
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
      const model = scrolliumModule.getModelById(id);
      useSyncExternalStore(model.onScrollWatcher, model.getScrollPosition);
      useSyncExternalStore(model.onScrollStopWatcher, model.getIsScrolling);
      return model.getClient();
    },
    useScrolliumSelector: (id: string) => {
      const [mount] = useState(() => {
        return (notify: () => void) => {
          return scrolliumModule.subscribe(`onModelLoad-${id}`, () => {
            notify();
          });
        };
      });
      const [snapshot] = useState(() => {
        return () => scrolliumModule.hasModel(id);
      });
      useSyncExternalStore(mount, snapshot);
      if (!scrolliumModule.hasModel(id)) return undefined;

      const model = scrolliumModule.getModelById(id);
      return {
        commands: model.commands,
        getClient: model.getClient,
        subscribe: model.subscribe,
      };
    },
    getScrolliumClient: (id: string) => {
      const model = scrolliumModule.getModelById(id);
      return {
        commands: model.commands,
        getClient: model.getClient,
        subscribe: model.subscribe,
      };
    },
  };
};

export { createQuantumScrolliumClient };
