import { useContext } from "react";
import { WizardContext } from "./WizardProvider";

const useWizardCommands = () => {
  const context = useContext(WizardContext)!;
  if (!context) {
    throw new Error("WizardContext not found");
  }
  return {
    next: context.client.next,
    previous: context.client.previous,
    reset: context.client.reset,
    goToStep: context.client.goToStep,
  };
};

export { useWizardCommands };
