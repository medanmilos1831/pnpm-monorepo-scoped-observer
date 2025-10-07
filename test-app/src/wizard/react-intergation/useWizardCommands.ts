import { useContext } from "react";
import { WizardContext } from "./WizardProvider";

const useWizardCommands = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }

  return {
    next: context.wizard.next,
    prev: context.wizard.prev,
    reset: context.wizard.reset,
    navigateToStep: context.wizard.navigateToStep,
  };
};

export { useWizardCommands };
