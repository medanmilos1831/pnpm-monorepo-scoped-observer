import { useContext, useState, useSyncExternalStore } from "react";
import { useScroll } from "./useScroll";
import { ScrollContext } from "../Scroll";
import { ScrolliumEvents } from "../types";

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
  const scrollPosition = useSyncExternalStore(
    subsciber,
    client.getScrollPosition
  );
  return {
    scrollPosition,
  };
};

export { useScrollPosition };
