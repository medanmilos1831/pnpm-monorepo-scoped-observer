import { Observer } from "./observer";
import { Wizard } from "./core";
import {
  WIZARD_EVENTS,
  WIZARD_SCOPE,
  type WizardOptions,
  type WizardRoute,
} from "./types";

const createWizard = (config: WizardRoute[], opts: WizardOptions) => {
  const observer = new Observer();
  const wizard = new Wizard(config, opts, observer.events);

  return {
    activeStepSyncStore: observer.subscribers.activeStepSyncStore,
    stepParamsSyncStore: observer.subscribers.stepParamsSyncStore,
    rejectSubscription: observer.subscribers.rejectSubscription,
    getActiveStepSnapshot: () => wizard.activeStep,
    getStepParamsSnapshot: () => wizard.stepsMap[wizard.activeStep],
    completedStepSnapshot: () => wizard.stepsMap[wizard.activeStep].isCompleted,
    mutateStep: wizard.mutateStep,
    nextStep: wizard.nextStep,
    prevStep: wizard.prevStep,
    isLast: () => wizard.isLast,
    isFirst: () => wizard.isFirst,
    pera: (callback: any) => {
      return observer.observer.subscribe({
        scope: WIZARD_SCOPE,
        eventName: WIZARD_EVENTS.STEP_CHANGED,
        callback: () => {
          callback();
        },
      });
    },
    subscribe: observer.observer.subscribe,
  };
};

export { createWizard };
