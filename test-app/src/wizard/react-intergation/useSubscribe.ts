import { useContext, useState, useSyncExternalStore } from "react";
import { Context } from "./WizzardProvider";

const useSubscriber = (
  { eventName }: { eventName: string },
  snapshot: () => any
) => {
  const { subscribe } = useContext(Context)!;
  const [state] = useState(() => {
    return (notify: () => void) => {
      return subscribe({
        scope: "wizard",
        eventName,
        callback: notify,
      });
    };
  });
  return useSyncExternalStore(state, snapshot);
};

export { useSubscriber };
