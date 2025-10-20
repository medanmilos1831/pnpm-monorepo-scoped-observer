import { useContext } from "react";
import { WizardClientContext } from "../WizardClientProvider";
const useWizardClient = () => {
  const context = useContext(WizardClientContext);
  if (!context) {
    throw new Error("WizardClientContext not found");
  }
  return context;
};

export { useWizardClient };
