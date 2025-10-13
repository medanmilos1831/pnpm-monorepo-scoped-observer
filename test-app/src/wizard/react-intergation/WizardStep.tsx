import { useContext, useEffect, type PropsWithChildren } from "react";
import { WizardContext } from "./WizardProviderHOC";
import type { IWizardStep } from "./types";

const WizardStep = ({ children, commands }: PropsWithChildren<IWizardStep>) => {
  const context = useContext(WizardContext);
  useEffect(() => {
    context.client.onNext();
    // console.log(context.client.onNext);
    // if (!commands) return;
    // Object.entries(commands).forEach(([key, value]) => {
    //   console.log(context.client.nextStep());
    // });
  });
  return <>{children}</>;
};

export { WizardStep };
