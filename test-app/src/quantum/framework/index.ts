import { createModuleInfrastructure } from "./createModuleInfrastructure";
import type { IModuleConfig } from "./types";

/**
 * Public framework facade that exposes module creation utilities.
 * Internally forwards to `createModuleInfrastructure` and re-exports the helpers
 * needed to work with entities at runtime.
 */
const framework = (function () {
  return {
    /**
     * Creates a module with the provided configuration.
     */
    createModule: <S = any>(moduleConfig: IModuleConfig<S>) =>
      createModuleInfrastructure(moduleConfig),
  };
})();

export { framework };
