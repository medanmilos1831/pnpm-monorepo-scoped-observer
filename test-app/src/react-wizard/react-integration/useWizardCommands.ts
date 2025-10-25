import { useContext } from "react";
import type { Store } from "../Store/Store";
import { useWizardClient } from "./useWizardClient";

const useWizardCommands = (
  store: Store,
  WizardContext: React.Context<{ id: string } | undefined>
) => {
  const context = useContext(WizardContext)!;
  if (!context) {
    throw new Error("WizardContext not found");
  }
  const item = store.getEntity(context.id);
  return {
    // next: client.next,
    // previous: client.previous,
    // reset: client.reset,
    // goToStep: client.goToStep,
  };
};

export { useWizardCommands };
