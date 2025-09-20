import { Wizard } from "./Wizard";
import type { WizzardOptions, WizzardRoute } from "./types";

const createWizzard = (config: WizzardRoute[], opts: WizzardOptions) => {
  return new Wizard(config, opts);
};

export { createWizzard };
