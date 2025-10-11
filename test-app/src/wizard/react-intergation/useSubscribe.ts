import { useContext, useState, useSyncExternalStore } from "react";
import { WizardContext } from "./WizardProvider";

const useSubscriber = (
  { eventName }: { eventName: string },
  snapshot: () => any
) => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }
  const { client } = context;
  const { subscribe } = client;
  const [state] = useState(() => {
    return (notify: () => void) => {
      return subscribe({
        eventName,
        callback: notify,
      });
    };
  });
  return useSyncExternalStore(state, snapshot);
};

export { useSubscriber };
