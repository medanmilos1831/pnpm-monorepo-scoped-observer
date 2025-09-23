import { useContext, useState, useSyncExternalStore } from "react";
import { WIZARD_SCOPE } from "../types";
import { Context } from "./Provider";

const useSubscriber = (
  { eventName }: { eventName: string },
  snapshot: () => any
) => {
  const { subscribe } = useContext(Context)!;
  const [state] = useState(() => {
    return (notify: () => void) => {
      return subscribe({
        scope: WIZARD_SCOPE,
        eventName,
        callback: notify,
      });
    };
  });
  return useSyncExternalStore(state, snapshot);
};

export { useSubscriber };
