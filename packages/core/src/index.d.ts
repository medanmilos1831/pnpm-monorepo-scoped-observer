import { scopeNodeType } from './types';
export declare const createEventManager: (arr: scopeNodeType[]) => {
    dispatch: ({ scope, eventName, payload }: import("./types").actionType) => void;
    subscribe: ({ scope, eventName, callback }: import("./types").subscribeType) => () => void;
    eventInterceptor: ({ scope, eventName, callback, }: import("./types").interceptorType) => void;
    logging: () => void;
};
//# sourceMappingURL=index.d.ts.map