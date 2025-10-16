import { useContext } from "react";
import { WizardContext } from "./WizardProvider";
import { useWizardClient } from "./WizardClient/WizardClientProvider";

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
