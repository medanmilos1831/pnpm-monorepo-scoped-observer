import type { IWizzardConfig } from "./types";
import { Wizzard } from "./Wizzard";

const createWizzard = (config: IWizzardConfig) => {
  const wizzard = new Wizzard(config);
  return wizzard;
};

export { createWizzard };
