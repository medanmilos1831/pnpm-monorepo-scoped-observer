import { useContext, useState, useSyncExternalStore } from "react";
import { UiReferencesClientContext } from "./react-integration/UiReferencesClientProvider";

const useReferenceSelector = (id: string) => {
  const context = useContext(UiReferencesClientContext);
  if (!context) {
    throw new Error("UiReferencesClientContext not found");
  }
  const [subscriber] = useState(() => {
    return (notify: () => void) => {
      return context.observer.subscribe({
        scope: "ui-reference-store",
        eventName: `createEntity-${id}`,
        callback: notify,
      });
    };
  });
  const [snapshot] = useState(() => {
    return () => context.getEntity(id);
  });
  return useSyncExternalStore(subscriber, snapshot);
};

export { useReferenceSelector };
