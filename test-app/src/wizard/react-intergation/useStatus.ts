import { useContext } from "react";
import { WizardContext } from "./WizardProvider";
import { WizardEvents, WIZARD_SCOPE } from "../types";
import { useSubscriber } from "./useSubscribe";

const useStatus = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }

  return useSubscriber(
    {
      eventName: WizardEvents.SET_STATUS,
    },
    context.wizard.getStatus
  );
};

export { useStatus };
