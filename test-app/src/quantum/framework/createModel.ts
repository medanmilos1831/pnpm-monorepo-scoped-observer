import { core } from "../core/core";

function createModel(moduleConfigParams: any, modelProps: any) {
  const observer = core.createObserver();
  const broker = core.createMessageBroker(observer);
  const model = core.createStateManager(moduleConfigParams.model(modelProps));
  return moduleConfigParams.modelClient(model, broker);
}

export { createModel };
