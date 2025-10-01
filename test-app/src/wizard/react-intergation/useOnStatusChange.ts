import { useContext } from "react";
import { Context } from "./WizzardProvider";
import { WizardEvents, WizardScopes } from "../types";
import { useSubscriber } from "./useSubscribe";

const useOnStatusChange = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }

  return useSubscriber(
    {
      eventName: WizardEvents.SET_STATUS,
      scope: WizardScopes.COMMANDS,
    },
    context.getStatus
  );
};

export { useOnStatusChange };
