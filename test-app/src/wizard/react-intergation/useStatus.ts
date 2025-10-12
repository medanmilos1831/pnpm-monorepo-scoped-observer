import { useContext } from "react";
import { WizardEvents } from "../types";
import { useSubscribe } from "./useSubscribe";
import { WizardContext } from "./WizardProvider";
import { createEventName } from "../utils";

const useStatus = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }

  return useSubscribe(
    createEventName(context.name, WizardEvents.ON_STATUS_CHANGE),
    context.client.getStatus
  );
};

export { useStatus };
