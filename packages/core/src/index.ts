import { EventEntity } from './EventEntity';
import { EventManager } from './EventManager';
import { scopeNodeType } from './types';

export const createEventManager = (arr: scopeNodeType[]) => {
  let manager = new EventManager();
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
    dispatch: manager.managerAction,
    subscribe: manager.managerSubscribe,
    eventInterceptor: manager.managerEventInterceptor,
    logging: manager.logging,
  };
};

export type { IEventManager } from './types';
