import { EventEntity } from "./EventEntity";
import { actionType, interceptorType, subscribeType } from "./types";
export declare class EventManager {
    events: {
        [key: string]: EventEntity;
    };
    protected log(type: "dispatch" | "subscribe" | "interceptor", payload: any, scope: string, eventName: string): void;
    findScope(scope: string): EventEntity | undefined;
    managerAction: ({ scope, eventName, payload }: actionType) => void;
    managerSubscribe: ({ scope, eventName, callback }: subscribeType) => () => void;
    managerEventInterceptor: ({ scope, eventName, callback, }: interceptorType) => void;
    private runInterceptor;
    logging: () => void;
}
//# sourceMappingURL=EventManager.d.ts.map