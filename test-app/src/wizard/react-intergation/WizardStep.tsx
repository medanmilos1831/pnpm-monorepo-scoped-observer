import { useContext, useEffect, type PropsWithChildren } from "react";
import { WizardContext } from "./WizardProvider";
import type { IWizardStep } from "./types";

const WizardStep = ({ children, commands }: PropsWithChildren<IWizardStep>) => {
  const context = useContext(WizardContext);
  useEffect(() => {
    console.log(context);
    if (!commands) return;
    // Object.entries(commands).forEach(([key, value]) => {
    //   console.log(key, value);
    // });
  });
  return <>{children}</>;
};

export { WizardStep };
