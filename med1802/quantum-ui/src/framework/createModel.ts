import { core } from "../core/core";
import type { CreateModuleConfigType } from "./types";

function createModel<T extends { id: string }>(
  moduleConfigParams: CreateModuleConfigType,
  modelProps: T
) {
  const modelScope = "MODEL_OBSERVER";
  const stateManager = core.createStateManager(
    moduleConfigParams.entity(modelProps)
  );
  const modelObserver = core.createObserver(modelScope);
  return moduleConfigParams.modelApiClient(
    stateManager,
    modelObserver.dispatch,
    modelObserver.subscribe
  );
}

export { createModel };
