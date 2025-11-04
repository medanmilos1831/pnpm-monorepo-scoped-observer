import { createObserver } from "../core/observer";
import type { createStore } from "../Store/createStore";

const useVisibilitySelector = (
  {
    store,
    observer,
  }: {
    store: ReturnType<typeof createStore<any>>;
    observer: ReturnType<typeof createObserver>;
  },
  id: string
) => {
  // const [mount] = useState(() => {
  //   return (notify: () => void) => {
  //     return observer.subscribe(
  //       `${ScrolliumStoreEvents.CREATE_SCROLLIUM}-${id}`,
  //       notify
  //     );
  //   };
  // });
  // const [snapshot] = useState(() => {
  //   return () => store.getters.hasEntity(id);
  // });
  // useSyncExternalStore(mount, snapshot);
  // if (!store.getters.hasEntity(id)) return undefined;
  // return store.getters.getEntityById(id).api.getClientEntity();
};

export { useVisibilitySelector };
