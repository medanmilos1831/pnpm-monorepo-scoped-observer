import { useContext, useEffect, type PropsWithChildren } from "react";
import { WizardContext } from "./WizardProvider";
import type {
  IOnMiddlewareNextPreviousParams,
  IOnNextPreviousParams,
  IOnValidateParams,
  IWizardStep,
} from "./types";
import { WizardInternalEvents, WizardEvents } from "../Store/Entity/types";
import { useWizardClient } from "./WizardClient/WizardClientProvider";

const WizardStep = ({
  children,
  onNext,
  onPrevious,
  validate,
  middlewareOnNext,
  middlewareOnPrevious,
}: PropsWithChildren<IWizardStep>) => {
  const context = useContext(WizardContext)!;
  if (!context) {
    throw new Error("WizardContext not found");
  }
  const store = useWizardClient();
  const client = store.getClient(context.id);
  const step = store.getEntity(context.id).step;

  step.setStepDefinition({
    hasValidation: !!validate,
    onNext: !!onNext,
    onPrevious: !!onPrevious,
    middlewareOnNext: !!middlewareOnNext,
    middlewareOnPrevious: !!middlewareOnPrevious,
  });

  useEffect(() => {
    const eventHandlers: Array<{
      event: string;
      handler: Function | undefined;
      callback: (params: any) => void;
    }> = [
      {
        event: WizardEvents.ON_NEXT,
        handler: onNext,
        callback: (params: { payload: IOnNextPreviousParams }) =>
          onNext!(params.payload),
      },
      {
        event: WizardEvents.ON_PREVIOUS,
        handler: onPrevious,
        callback: (params: { payload: IOnNextPreviousParams }) =>
          onPrevious!(params.payload),
      },
      {
        event: WizardInternalEvents.ON_MIDDLEWARE_NEXT,
        handler: middlewareOnNext,
        callback: (params: { payload: IOnMiddlewareNextPreviousParams }) =>
          middlewareOnNext!(params.payload),
      },
      {
        event: WizardInternalEvents.ON_MIDDLEWARE_PREVIOUS,
        handler: middlewareOnPrevious,
        callback: (params: { payload: IOnMiddlewareNextPreviousParams }) =>
          middlewareOnPrevious!(params.payload),
      },
      {
        event: WizardInternalEvents.ON_VALIDATE,
        handler: validate,
        callback: (params: { payload: IOnValidateParams }) =>
          validate!(params.payload),
      },
    ];

    const unsubscribers = eventHandlers
      .filter(({ handler }) => handler)
      .map(({ event, callback }) => client.subscribe(event, callback));

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  });

  return <>{children}</>;
};

export { WizardStep };
