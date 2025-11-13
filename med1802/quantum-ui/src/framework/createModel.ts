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
  const subscribe = (eventName: string, callback: (payload: any) => void) => {
    return modelObserver.subscribe(eventName, callback)!;
  };
  return moduleConfigParams.modelApiClient(
    stateManager,
    modelObserver.dispatch,
    subscribe
  );
}

export { createModel };
