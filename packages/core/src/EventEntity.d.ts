export declare class EventEntity extends EventTarget {
    entityName?: string;
    eventInterceptor: Map<string, ((payload: any) => any)[]>;
    scopedEvents: Record<string, EventEntity>;
    listeners: Map<string, Set<(e: any) => void>>;
    log: boolean;
    constructor(name: string, log: boolean);
    dispatch: ({ eventName, payload, }: {
        eventName: string;
        payload?: any;
    }) => void;
    subscribe: (eventName: string, callback: (e: any) => void) => () => void;
}
//# sourceMappingURL=EventEntity.d.ts.map