import { EventEntity } from './EventEntity';
import { EventManager } from './EventManager';
export const createEventManager = (arr) => {
    let manager = new EventManager();
    const buildScopes = (arr) => {
        const obj = {};
        arr.forEach(({ scope, subScopes, log = false }) => {
            const entity = new EventEntity(scope, log);
            if (subScopes) {
                entity.scopedEvents = buildScopes(subScopes);
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
