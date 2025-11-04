import type { createStore } from "../Store/createStore";
import { createEntityApiClient } from "../Store/Entity/createEntityApiClient";
import type { VisibilityProps } from "../types";

const useVisibilty = (
  store: ReturnType<typeof createStore<any>>,
  props: VisibilityProps
) => {
  console.log("useVisibilty", props);
  store.mutations.createEntity({ id: props.id }, () => {
    return createEntityApiClient(props);
  });
  // const entity = store.getters.getEntityById(id);
  // console.log("entity", entity);
  // const getters = entity.api.getGetters();
  // const addEventListener = entity.api.addEventListener;
  // const [onScroll] = useState(() => (notify: () => void) => {
  //   return addEventListener(ScrolliumPublicEvents.ON_SCROLL, () => {
  //     notify();
  //   });
  // });
  // const [onScrollStop] = useState(() => (notify: () => void) => {
  //   return addEventListener(ScrolliumPublicEvents.ON_SCROLL_STOP, () => {
  //     notify();
  //   });
  // });
  // useSyncExternalStore(onScroll, getters.getScrollPosition);
  // useSyncExternalStore(onScrollStop, getters.getIsScrolling);
  // return entity.api.getClient();
  return {};
};

export { useVisibilty };
