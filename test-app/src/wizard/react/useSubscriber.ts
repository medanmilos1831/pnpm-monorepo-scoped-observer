import { useContext, useState, useSyncExternalStore } from "react";
import { WIZARD_SCOPE } from "../types";
import { Context } from "./Provider";

const useSubscriber = (
  { eventName }: { eventName: string },
  snapshot: () => any
) => {
  const { value } = useContext(Context)!;
  const [state] = useState(() => {
    return (notify: () => void) => {
      return value.subscribe({
        scope: WIZARD_SCOPE,
        eventName,
        callback: () => {
          notify();
        },
      });
    };
  });
  const store = useSyncExternalStore(state, snapshot);
  return store;
};

export { useSubscriber };
