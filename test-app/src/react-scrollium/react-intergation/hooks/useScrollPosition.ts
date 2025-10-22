import { useContext, useState, useSyncExternalStore } from "react";
import { useScroll } from "./useScroll";
import { ScrollContext } from "../ScrollProvider";
import { getScrolliumData } from "../../utils";
import { ScrolliumEvents } from "../../types";
import type { Store } from "../../Store";

const useScrollPosition = (store: Store) => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("ScrollContext not found");
  }
  const client = useScroll(store, context.id)!;
  const [subsciber] = useState(() => (notify: () => void) => {
    return client.subscribe(ScrolliumEvents.ON_SCROLL, () => {
      notify();
    });
  });
  const [subsciberStop] = useState(() => (notify: () => void) => {
    return client.subscribe(ScrolliumEvents.ON_SCROLL_STOP, () => {
      notify();
    });
  });
  useSyncExternalStore(subsciber, client.getScrollPosition);
  useSyncExternalStore(subsciberStop, client.getIsScrolling);
  return getScrolliumData(client);
};

export { useScrollPosition };
