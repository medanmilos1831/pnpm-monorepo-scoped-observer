import { useContext } from "react";
import { WizardContext } from "./WizardProvider";

const useWizardCommands = () => {
  const context = useContext(WizardContext);
  return {
    next: context.client.next,
    previous: context.client.previous,
    reset: context.client.reset,
    goToStep: context.client.goToStep,
  };
};

export { useWizardCommands };
