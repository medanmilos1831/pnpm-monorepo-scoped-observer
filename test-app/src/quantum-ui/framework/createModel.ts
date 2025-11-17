import { core } from "../core/core";
import type { CreateModuleConfigType } from "./types";

function createModel<T extends { id: string }>(
  moduleConfigParams: CreateModuleConfigType,
  modelProps: T
) {
  const modelObserver = core.createObserver();
  const broker = core.createMessageBroker(modelObserver);
  const model = core.createStateManager(moduleConfigParams.model(modelProps));
  return moduleConfigParams.apiClient(model, broker);
}

export { createModel };
