import { useContext } from "react";
import { WizardContext } from "./WizardProviderHOC";

const useWizardCommands = () => {
  const context = useContext(WizardContext);
  return {
    next: context.client.next,
    previous: context.client.previous,
  };
};

export { useWizardCommands };
