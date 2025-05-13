import { EventManager } from './EventManager';

let manager = new EventManager();
const dispatch = manager.managerAction;
const subscribe = manager.managerSubscribe;
const eventInterceptor = manager.managerEventInterceptor;
const configEventManager = manager.configEventManager;
const logging = manager.logging;
export { dispatch, eventInterceptor, subscribe, configEventManager, logging };
