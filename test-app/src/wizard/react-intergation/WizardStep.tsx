import { useContext, useEffect, type PropsWithChildren } from "react";
import { WizardContext } from "./WizardProvider";
import type { IWizardStep } from "./types";
import { IWizardInternalEvents, WizardEvents } from "../types";

const WizardStep = ({
  children,
  onNext,
  onPrevious,
  validate,
}: PropsWithChildren<IWizardStep>) => {
  const context = useContext(WizardContext);
  context.step.setStepDefinition({
    hasValidation: !!validate,
    onNext: !!onNext,
    onPrevious: !!onPrevious,
  });
  useEffect(() => {
    let unsubscribe = () => {};
    if (!onNext) return;
    unsubscribe = context.client.subscribe(
      WizardEvents.ON_NEXT,
      (params: any) => onNext(params.payload)
    );
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  });
  useEffect(() => {
    let unsubscribe = () => {};
    if (!validate) return;
    unsubscribe = context.client.subscribe(
      IWizardInternalEvents.ON_VALIDATE,
      (params: any) => validate(params.payload)
    );
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  });
  return <>{children}</>;
};

export { WizardStep };
