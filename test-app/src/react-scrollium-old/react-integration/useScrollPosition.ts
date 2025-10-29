import {
  useContext,
  useState,
  useSyncExternalStore,
  type Context,
} from "react";
import { useScroll } from "./useScroll";
import type { Store } from "../Store/Store";
import { ScrolliumEvents } from "../types";
import { getScrolliumData } from "../utils";

const useScrollPosition = (
  store: Store,
  ScrollContext: Context<{ id: string } | undefined>
) => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("ScrollContext not found");
  }
  const getters = useScroll(store, context.id)!;
  const [subsciber] = useState(() => (notify: () => void) => {
    return getters.subscribe(ScrolliumEvents.ON_SCROLL, () => {
      notify();
    });
  });
  const [subsciberStop] = useState(() => (notify: () => void) => {
    return getters.subscribe(ScrolliumEvents.ON_SCROLL_STOP, () => {
      notify();
    });
  });
  useSyncExternalStore(subsciber, getters.getScrollPosition);
  useSyncExternalStore(subsciberStop, getters.getIsScrolling);
  return getScrolliumData(getters);
};

export { useScrollPosition };
