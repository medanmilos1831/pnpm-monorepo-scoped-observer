import { useContext, useState, useSyncExternalStore } from "react";
import { WizardContext } from "./WizardProvider";
import { WIZARD_SCOPE } from "../types";

const useSubscriber = (
  { eventName }: { eventName: string },
  snapshot: () => any
) => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }
  const { observer } = context;
  const { subscribe } = observer;
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
