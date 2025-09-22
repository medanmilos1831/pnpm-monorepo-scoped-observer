import { Client } from "./Client";
import { Observer } from "./Observer";
import { ObserverNew } from "./ObserverNew";
import { Wizard } from "./Wizard";
import type { WizzardOptions, WizzardRoute } from "./types";

const createWizzard = (config: WizzardRoute[], opts: WizzardOptions) => {
  const observer = new Observer();
  const wizard = new Wizard(config, opts, observer);
  const { activeStepSyncStore, stepParamsSyncStore, nextStep, prevStep } =
    new Client(observer);

  return {
    activeStepSyncStore: observer.subscribeActiveStepSyncStore,
    stepParamsSyncStore: observer.subscribeStepParamsSyncStore,
    nextStep,
    prevStep,
  };
};

export { createWizzard };
