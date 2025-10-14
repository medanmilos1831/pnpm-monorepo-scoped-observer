import { useContext, useEffect, type PropsWithChildren } from "react";
import { WizardContext } from "./WizardProvider";
import type { IWizardStep } from "./types";
import { IWizardInternalEvents, WizardEvents } from "../types";
import { createEventName } from "../utils";

const WizardStep = ({
  children,
  onNext,
  onPrevious,
  validate,
  middleware,
}: PropsWithChildren<IWizardStep>) => {
  const context = useContext(WizardContext);
  context.step.setStepDefinition({
    hasValidation: !!validate,
    onNext: !!onNext,
    onPrevious: !!onPrevious,
    middleware: !!middleware,
  });
  useEffect(() => {
    let unsubscribe = () => {};
    if (!onNext) return;
    unsubscribe = context.client.subscribe(
      createEventName(context.client.getWizardId(), WizardEvents.ON_NEXT),
      (params: any) => {
        onNext(params.payload);
      }
    );
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  });
  useEffect(() => {
    let unsubscribe = () => {};
    if (!onPrevious) return;
    unsubscribe = context.client.subscribe(
      createEventName(context.client.getWizardId(), WizardEvents.ON_PREVIOUS),
      (params: any) => onPrevious(params.payload)
    );
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  });

  useEffect(() => {
    let unsubscribe = () => {};
    if (!middleware) return;
    unsubscribe = context.client.subscribe(
      createEventName(
        context.client.getWizardId(),
        IWizardInternalEvents.ON_MIDDLEWARE
      ),
      (params: any) => middleware(params.payload)
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
      createEventName(
        context.client.getWizardId(),
        IWizardInternalEvents.ON_VALIDATE
      ),
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
