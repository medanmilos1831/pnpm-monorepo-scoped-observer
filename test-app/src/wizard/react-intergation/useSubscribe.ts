import { useContext, useState, useSyncExternalStore } from "react";
import { WizardContext } from "./WizardProvider";

const useSubscriber = (
  { eventName, scope = "wizard" }: { eventName: string; scope?: string },
  snapshot: () => any
) => {
  const { subscribe } = useContext(WizardContext)!.wizard;
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
