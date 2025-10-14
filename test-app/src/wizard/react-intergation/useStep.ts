import { useContext, useState, useSyncExternalStore } from "react";
import { WizardContext } from "./WizardProvider";
import { WizardEvents } from "../types";

const useStep = () => {
  const context = useContext(WizardContext);
  const [subsciber, __] = useState(() => (notify: () => void) => {
    return context.client.subscribe(
      WizardEvents.ON_STEP_CHANGE,
      (params: any) => {
        notify();
      }
    );
  });
  return useSyncExternalStore(subsciber, context.client.getActiveStep);
};

export { useStep };
