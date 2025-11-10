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
  function withAutoEvents(
    actions: Record<string, (...args: any[]) => any>,
    dispatch: (eventName: string, payload: any) => void
  ) {
    const wrapped: any = {};
    Object.keys(actions).forEach((key) => {
      wrapped[key] = (...args: any[]) => {
        const result = actions[key](...args);
        dispatch(key, result);
      };
    });
    return wrapped;
  }
  // const wrappedActions = withAutoEvents(
  //   contextConfigParams.actions(stateManager),
  //   dispatchFn
  // );
  return {
    entity: stateManager,
    actions: contextConfigParams.actions(stateManager, dispatchFn),
    subscribe: (eventName: string, callback: (payload: any) => void) => {
      return contextObserver.subscribe(eventName, callback);
    },
  };
}

export { createContext };
