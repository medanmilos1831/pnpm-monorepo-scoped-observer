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
  return contextConfigParams.contextApiClient(
    stateManager,
    contextObserver.dispatch,
    contextObserver.subscribe
  );
}

export { createContext };
