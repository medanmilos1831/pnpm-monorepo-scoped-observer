import { useContext, useState, useSyncExternalStore } from "react";
import { WizardClientContext } from "../WizardClientProvider";

const useWizard = (id: string) => {
  const context = useContext(WizardClientContext);
  if (!context) {
    throw new Error("WizardClientContext not found");
  }
  const [subscriber] = useState(() => {
    return (notify: () => void) => {
      return context.subscribe(`createWizard-${id}`, notify);
    };
  });
  const [snapshot] = useState(() => {
    return () => context.entities.size;
  });
  const entity = useSyncExternalStore(subscriber, snapshot);
  return entity ? context.getEntity(id).client : undefined;
};

export { useWizard };
