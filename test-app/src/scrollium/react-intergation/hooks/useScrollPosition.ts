import { useContext, useState, useSyncExternalStore } from "react";
import { useScroll } from "./useScroll";
import { ScrollContext } from "../Scroll";
import { ScrolliumEvents } from "../types";
import { getScrolliumData } from "../../utils";

const useScrollPosition = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("ScrollContext not found");
  }
  const client = useScroll(context.id)!;
  const [subsciber, __] = useState(() => (notify: () => void) => {
    return client.subscribe(ScrolliumEvents.ON_SCROLL, () => {
      notify();
    });
  });
  useSyncExternalStore(subsciber, client.getScrollPosition);
  return getScrolliumData(client);
};

export { useScrollPosition };
