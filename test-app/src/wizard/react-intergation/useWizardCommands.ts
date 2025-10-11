import { useContext } from "react";
import { WizardContext } from "./WizardProvider";

const useWizardCommands = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }
  const { client } = context;
  const { next, prev, reset, navigateToStep } = client;
  return {
    next,
    prev,
    reset,
    navigateToStep,
  };
};

export { useWizardCommands };
