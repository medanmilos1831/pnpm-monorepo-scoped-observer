import { createScopedObserver } from "../scroped-observer";
import { Commands } from "./Commands";
import { Subscribers } from "./Subscribers";
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
  const commands = new Commands(observer);
  const subscribers = new Subscribers(observer);

  return {
    activeStepSyncStore: subscribers.activeStepSyncStore,
    stepParamsSyncStore: subscribers.stepParamsSyncStore,
    rejectSubscription: subscribers.rejectSubscription,
    getActiveStepSnapshot: () => wizard.activeStep,
    getStepParamsSnapshot: () => wizard.stepsMap[wizard.activeStep],

    mutateStep: wizard.mutateStep,

    nextStep: commands.nextStep,
    prevStep: commands.prevStep,
  };
};

export { createWizzard };
