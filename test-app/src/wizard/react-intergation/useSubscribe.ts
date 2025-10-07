import { useContext, useState, useSyncExternalStore } from "react";
import { WizardContext } from "./WizardProvider";

const useSubscriber = (
  { eventName, scope = "wizard" }: { eventName: string; scope?: string },
  snapshot: () => any,
  name?: string
) => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }
  const entity = context.getWizard(name);

  const [state] = useState(() => {
    return (notify: () => void) => {
      return entity.subscribe({
        scope,
        eventName,
        callback: notify,
      });
    };
  });
  return useSyncExternalStore(state, snapshot);
};

export { useSubscriber };
