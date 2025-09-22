import { Observer } from "./Observer";
import { Wizard } from "./Wizard";
import { WIZARD_COMMANDS, WIZARD_EVENTS } from "./constants";
import type { WizzardOptions, WizzardRoute } from "./types";

const createWizzard = (config: WizzardRoute[], opts: WizzardOptions) => {
  const observer = new Observer();
  const wizard = new Wizard(config, opts, observer);

  return {
    activeStepSyncStore: observer.subscribeActiveStepSyncStore,
    getActiveStepSnapshot: () => wizard.activeStep,
    stepParamsSyncStore: observer.subscribeStepParamsSyncStore(
      (payload: any) => {
        wizard.stepsMap[wizard.activeStep] = {
          ...wizard.stepsMap[wizard.activeStep],
          ...payload,
        };
      }
    ),
    getStepParamsSnapshot: () => wizard.stepsMap[wizard.activeStep],

    nextStep: () => {
      observer.dispatch({
        eventName: WIZARD_EVENTS.NAVIGATION_REQUESTED,
        payload: {
          command: WIZARD_COMMANDS.NEXT,
        },
      });
    },
    prevStep: () => {
      observer.dispatch({
        eventName: WIZARD_EVENTS.NAVIGATION_REQUESTED,
        payload: {
          command: WIZARD_COMMANDS.PREV,
        },
      });
    },
  };
};

export { createWizzard };
