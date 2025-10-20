import { useContext } from "react";
import { WizardContext } from "../Wizard/WizardProvider";
import { useWizard } from "./useWizard";

const useWizardCommands = () => {
  const context = useContext(WizardContext)!;
  if (!context) {
    throw new Error("WizardContext not found");
  }
  const client = useWizard(context.id)!;
  return {
    next: client.next,
    previous: client.previous,
    reset: client.reset,
    goToStep: client.goToStep,
  };
};

export { useWizardCommands };
