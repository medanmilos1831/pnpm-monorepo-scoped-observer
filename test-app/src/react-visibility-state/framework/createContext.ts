import { core } from "../core/core";
import type { CreateModuleConfigType } from "./types";

function createContext<T extends { id: string }>(
  contextConfigParams: CreateModuleConfigType,
  contextProps: T
) {
  const contextScope = "CONTEXT_OBSERVER";
  const stateManager = core.createStateManager(
    contextConfigParams.entity(contextProps)
  );
  const contextObserver = core.createObserver(contextScope);
  function dispatchFn(eventName: string, payload: any) {
    contextObserver.dispatch(eventName, payload);
  }
  return contextConfigParams.contextApiClient(
    stateManager,
    dispatchFn,
    contextObserver.subscribe
  );
}

export { createContext };
