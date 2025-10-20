import { useContext } from "react";
import { useWizardClient } from "./useWizardClient";
import { WizardContext } from "../Wizard/WizardProvider";

const useWizardCommands = () => {
  const context = useContext(WizardContext)!;
  if (!context) {
    throw new Error("WizardContext not found");
  }
  const store = useWizardClient();
  const client = store.getClient(context.id);
  return {
    next: client.next,
    previous: client.previous,
    reset: client.reset,
    goToStep: client.goToStep,
  };
};

export { useWizardCommands };
