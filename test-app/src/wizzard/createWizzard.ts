import { Client } from "./Client";
import { Wizard } from "./Wizard";
import type { WizzardOptions, WizzardRoute } from "./types";

const createWizzard = (config: WizzardRoute[], opts: WizzardOptions) => {
  const wizard = new Wizard(config, opts);
  const { activeStepSyncStore, stepParamsSyncStore, nextStep, prevStep } =
    new Client(wizard);

  return {
    activeStepSyncStore,
    stepParamsSyncStore,
    nextStep,
    prevStep,
  };
};

export { createWizzard };
