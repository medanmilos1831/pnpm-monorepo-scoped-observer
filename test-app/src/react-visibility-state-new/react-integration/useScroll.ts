import type { createStore } from "../Store/createStore";

const useScroll = (store: ReturnType<typeof createStore<any>>, id: string) => {
  // const entity = store.getters.getEntityById(id);
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

export { useScroll };
