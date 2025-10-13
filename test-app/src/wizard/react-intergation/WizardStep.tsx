import { useContext, useEffect, type PropsWithChildren } from "react";
import { WizardContext } from "./WizardProvider";
import type { IWizardStep } from "./types";

const WizardStep = ({ children, commands }: PropsWithChildren<IWizardStep>) => {
  const context = useContext(WizardContext);
  // context.stepDefinition({
  //   hasValidation: false,
  //   onNext: !!commands?.onNext,
  //   onPrevious: !!commands?.onPrevious,
  // });
  context.stepEntity.setStepDefinition({
    hasValidation: false,
    onNext: !!commands?.onNext,
    onPrevious: !!commands?.onPrevious,
  });
  useEffect(() => {
    // context.stepDefinition({
    //   hasValidation: false,
    //   onNext: commands?.onNext,
    //   onPrevious: commands?.onPrevious,
    // });
    // if (!commands) return;
    // Object.entries(commands).forEach(([key, value]) => {
    //   console.log(key, value);
    // });
  });
  return <>{children}</>;
};

export { WizardStep };
