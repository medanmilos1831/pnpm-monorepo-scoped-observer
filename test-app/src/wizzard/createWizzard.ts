import { createScopedObserver } from "../scroped-observer";
import { Wizard } from "./Wizard";
import { WIZARD_COMMANDS, WIZARD_EVENTS, WIZARD_SCOPE } from "./constants";
import type { WizzardOptions, WizzardRoute } from "./types";

const createWizzard = (config: WizzardRoute[], opts: WizzardOptions) => {
  const observer = createScopedObserver([
    {
      scope: WIZARD_SCOPE,
    },
  ]);
  const wizard = new Wizard(config, opts, observer);

  return {
    activeStepSyncStore: (notify: () => void) => {
      return observer.subscribe({
        scope: WIZARD_SCOPE,
        eventName: WIZARD_EVENTS.STEP_CHANGED,
        callback: () => {
          notify();
        },
      });
    },
    stepParamsSyncStore: (notify: () => void) => {
      return observer.subscribe({
        scope: WIZARD_SCOPE,
        eventName: WIZARD_EVENTS.STEP_PARAMS_CHANGED,
        callback: () => {
          notify();
        },
      });
    },
    rejectSubscription: (cb: (payload: any) => void) =>
      observer.subscribe({
        scope: WIZARD_SCOPE,
        eventName: WIZARD_EVENTS.STEP_REJECTED,
        callback: ({ payload }: any) => {
          cb(payload);
        },
      }),
    getActiveStepSnapshot: () => wizard.activeStep,
    getStepParamsSnapshot: () => wizard.stepsMap[wizard.activeStep],

    mutateStep: wizard.mutateStep,

    nextStep: () => {
      observer.dispatch({
        scope: WIZARD_SCOPE,
        eventName: WIZARD_EVENTS.NAVIGATION_REQUESTED,
        payload: {
          command: WIZARD_COMMANDS.NEXT,
        },
      });
    },
    prevStep: () => {
      observer.dispatch({
        scope: WIZARD_SCOPE,
        eventName: WIZARD_EVENTS.NAVIGATION_REQUESTED,
        payload: {
          command: WIZARD_COMMANDS.PREV,
        },
      });
    },
  };
};

export { createWizzard };
