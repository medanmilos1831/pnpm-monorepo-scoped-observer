import { core } from "../core/core";
import type { CreateModuleConfigType } from "./types";

function createModel<T extends { id: string }>(
  moduleConfigParams: CreateModuleConfigType,
  modelProps: T
) {
  const modelScope = "MODEL_OBSERVER";
  const modelObserver = core.createObserver(modelScope);
  const broker = core.createMessageBroker(modelObserver);
  const stateManager = core.createStateManager(
    moduleConfigParams.entity(modelProps)
  );
  return moduleConfigParams.modelApiClient(stateManager, broker);
}

export { createModel };
