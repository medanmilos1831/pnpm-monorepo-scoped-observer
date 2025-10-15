import { useContext, useEffect, type PropsWithChildren } from "react";
import { WizardContext } from "./WizardProvider";
import type {
  IOnMiddlewareNextPreviousParams,
  IOnNextPreviousParams,
  IOnValidateParams,
  IWizardStep,
} from "./types";
import { WizardInternalEvents, WizardEvents } from "../Wizard/types";

const WizardStep = ({
  children,
  onNext,
  onPrevious,
  validate,
  middlewareOnNext,
  middlewareOnPrevious,
}: PropsWithChildren<IWizardStep>) => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardContext not found");
  }
  context.step.setStepDefinition({
    hasValidation: !!validate,
    onNext: !!onNext,
    onPrevious: !!onPrevious,
    middlewareOnNext: !!middlewareOnNext,
    middlewareOnPrevious: !!middlewareOnPrevious,
  });
  useEffect(() => {
    let unsubscribe = () => {};
    if (!onNext) return;
    unsubscribe = context.client.subscribe(
      WizardEvents.ON_NEXT,
      (params: { payload: IOnNextPreviousParams }) => {
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
      WizardEvents.ON_PREVIOUS,
      (params: { payload: IOnNextPreviousParams }) => onPrevious(params.payload)
    );
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  });

  useEffect(() => {
    let unsubscribe = () => {};
    if (!middlewareOnNext) return;
    unsubscribe = context.client.subscribe(
      WizardInternalEvents.ON_MIDDLEWARE_NEXT,
      (params: { payload: IOnMiddlewareNextPreviousParams }) => {
        middlewareOnNext(params.payload);
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
    if (!middlewareOnPrevious) return;
    unsubscribe = context.client.subscribe(
      WizardInternalEvents.ON_MIDDLEWARE_PREVIOUS,
      (params: any) => middlewareOnPrevious(params.payload)
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
      WizardInternalEvents.ON_VALIDATE,
      (params: { payload: IOnValidateParams }) => validate(params.payload)
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
