import { useContext } from "react";
import { WizardContext } from "./WizardProvider";

const useWizardCommands = (name?: string) => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }
  const entity = context.getWizard(name);
  return {
    next: entity.next,
    prev: entity.prev,
    reset: entity.reset,
    navigateToStep: entity.navigateToStep,
  };
};

export { useWizardCommands };
