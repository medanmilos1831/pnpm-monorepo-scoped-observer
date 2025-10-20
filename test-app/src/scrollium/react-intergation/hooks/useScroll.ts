import { useContext, useState, useSyncExternalStore } from "react";
import { ScrolliumClientContext } from "../ScrolliumClientProvider";
import { ScrolliumStoreEvents } from "../../types";

const useScroll = (id: string) => {
  const context = useContext(ScrolliumClientContext);
  if (!context) {
    throw new Error("ScrolliumClientContext not found");
  }
  const [subscriber] = useState(() => {
    return (notify: () => void) => {
      return context.subscribe(
        `${ScrolliumStoreEvents.CREATE_SCROLLIUM}-${id}`,
        notify
      );
    };
  });
  const [snapshot] = useState(() => {
    return () => context.entities.size;
  });
  const entity = useSyncExternalStore(subscriber, snapshot);
  return entity ? context.getEntity(id).client : undefined;
};

export { useScroll };
