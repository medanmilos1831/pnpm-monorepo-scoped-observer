import { useContext } from "react";
import { WizardContext } from "./WizardProvider";
import { WizardEvents, WIZARD_SCOPE } from "../types";
import { useSubscriber } from "./useSubscribe";

const useOnStatusChange = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }

  return useSubscriber(
    {
      eventName: WizardEvents.SET_STATUS,
      scope: WIZARD_SCOPE,
    },
    context.wizard.getStatus
  );
};

export { useOnStatusChange };
