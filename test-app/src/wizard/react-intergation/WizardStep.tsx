import { useContext, type PropsWithChildren } from "react";
import type { IWizardStep } from "./types";
import { useWizardClient } from "./WizardClient/WizardClientProvider";
import { WizardContext } from "./WizardProvider";

const Step = ({ children, ...props }: PropsWithChildren<IWizardStep>) => {
  const context = useContext(WizardContext)!;
  if (!context) {
    throw new Error("WizardContext not found");
  }
  const store = useWizardClient();
  const step = store.getEntity(context.id).step;
  step.defineStep(props);

  return <>{children}</>;
};

export { Step };
