import { useContext } from "react";
import { WizzardContext } from "./Wizzard";

const useWizardCommands = () => {
  const context = useContext(WizzardContext);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }

  return {
    next: context.next,
    prev: context.prev,
    reset: context.reset,
    navigateToStep: context.navigateToStep,
  };
};

export { useWizardCommands };
