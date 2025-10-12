import { useContext, useState, useSyncExternalStore } from "react";
import { WizardContext } from "./WizardProvider";

const useSubscribe = (eventName: string, snapshot: () => any) => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }
  const { observer } = context;
  const [state] = useState(() => {
    return (notify: () => void) => {
      return observer.subscribe({
        eventName,
        callback: notify,
      });
    };
  });
  return useSyncExternalStore(state, snapshot);
};

export { useSubscribe };
