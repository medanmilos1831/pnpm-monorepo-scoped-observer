import { useContext, type PropsWithChildren } from "react";

import { WizardContext } from "./WizardProvider";
import type { IWizardStep } from "../../types";
import { WizardClientContext } from "../WizardClientProvider";

const Step = ({ children, ...props }: PropsWithChildren<IWizardStep>) => {
  const context = useContext(WizardContext)!;
  if (!context) {
    throw new Error("WizardContext not found");
  }
  const client = useContext(WizardClientContext);
  if (!client) {
    throw new Error("WizardClientContext not found");
  }
  const step = client.getEntity(context.id).step;
  step.defineStep(props);

  return <>{children}</>;
};

export { Step };
