import { EventEntity } from "./EventEntity";
import { ScopedObserver } from "./ScopedObserver";
import type { scopeNodeType } from "./types";

export const createScopedObserver = (arr: scopeNodeType[]) => {
  let manager = new ScopedObserver();
  const buildScopes = (arr: scopeNodeType[]) => {
    const obj: { [key: string]: EventEntity } = {};
    arr.forEach(({ scope, subScopes, log = false }) => {
      const entity = new EventEntity(scope, log);
      if (subScopes) {
        entity.scopedEvents = buildScopes(subScopes) as any;
      }
      obj[scope] = entity;
    });
    return obj;
  };
  manager.events = buildScopes(arr);
  return {
    dispatch: manager.scopedObserverAction,
    subscribe: manager.scopedObserverSubscribe,
    eventInterceptor: manager.scopedObserverInterceptor,
    logging: manager.logging,
  };
};

export type { IScopedObserver } from "./types";
