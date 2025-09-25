import type { IScopedObserver } from "../../scroped-observer";
import { createScopedObserver } from "../../scroped-observer";
import type { IWizardConfig } from "../types";
import { Commands } from "./Commands";

class Wizard {
  observer: IScopedObserver = createScopedObserver([
    {
      scope: "wizard",
    },
  ]);
  commands: Commands = new Commands(this.observer);
  __INIT_CONFIG__: IWizardConfig;
  constructor(config: IWizardConfig) {
    this.__INIT_CONFIG__ = structuredClone(config);
  }
}

export { Wizard };
