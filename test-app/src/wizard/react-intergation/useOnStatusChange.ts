import { useContext } from "react";
import { WizzardContext } from "./Wizzard";
import { WizardEvents, WIZARD_SCOPE } from "../types";
import { useSubscriber } from "./useSubscribe";

const useOnStatusChange = () => {
  const context = useContext(WizzardContext);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }
  console.log("context", context);

  return useSubscriber(
    {
      eventName: WizardEvents.SET_STATUS,
      scope: WIZARD_SCOPE,
    },
    context.getStatus
  );
};

export { useOnStatusChange };
