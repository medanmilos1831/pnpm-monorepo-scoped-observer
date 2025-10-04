import { useContext, useState, useSyncExternalStore } from "react";
import { WizzardContext } from "./Wizzard";

const useSubscriber = (
  { eventName, scope = "wizard" }: { eventName: string; scope?: string },
  snapshot: () => any
) => {
  const { subscribe } = useContext(WizzardContext)!;
  const [state] = useState(() => {
    return (notify: () => void) => {
      return subscribe({
        scope,
        eventName,
        callback: notify,
      });
    };
  });
  return useSyncExternalStore(state, snapshot);
};

export { useSubscriber };
