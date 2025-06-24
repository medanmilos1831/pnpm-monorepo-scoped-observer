export class EventManager {
    constructor() {
        this.events = {};
        this.managerAction = ({ scope, eventName, payload }) => {
            let entity = this.findScope(scope);
            if (!entity || !entity.listeners.has(eventName))
                return;
            if (entity.log) {
                this.log("dispatch", payload, scope, eventName);
            }
            entity.dispatch({
                eventName,
                payload,
            });
        };
        this.managerSubscribe = ({ scope, eventName, callback }) => {
            let entity = this.findScope(scope);
            let unsubscribe = () => { };
            if (!entity)
                return unsubscribe;
            unsubscribe = entity.subscribe(eventName, (e) => {
                callback(entity.eventInterceptor.has(eventName)
                    ? this.runInterceptor(entity, e.detail, scope, eventName)
                    : { payload: e.detail.payload });
                if (entity.log) {
                    this.log("subscribe", e.detail.payload, scope, eventName);
                }
            });
            return unsubscribe;
        };
        this.managerEventInterceptor = ({ scope, eventName, callback, }) => {
            let entity = this.findScope(scope);
            if (!entity)
                return;
            if (!entity.eventInterceptor.has(eventName)) {
                entity.eventInterceptor.set(eventName, []);
            }
            entity.eventInterceptor.get(eventName).push(callback);
        };
        this.logging = () => {
            console.log(this);
        };
    }
    log(type, payload, scope, eventName) {
        console.group(`[EventManager] ${type.toUpperCase()}`);
        console.table({
            Scope: scope,
            Event: eventName,
            Payload: payload,
        });
        console.groupEnd();
    }
    findScope(scope) {
        const scopes = scope.split(":").filter(Boolean);
        let current = this.events;
        for (let i = 0; i < scopes.length; i++) {
            const key = scopes[i];
            if (!current[key]) {
                console.warn(`Scope "${key}" not found in hierarchy.`);
                return undefined;
            }
            if (i === scopes.length - 1) {
                return current[key];
            }
            else {
                current = current[key].scopedEvents;
            }
        }
    }
    runInterceptor(event, eventDetail, scope, eventName) {
        let payload = eventDetail.payload;
        // If interceptors exist for the event, run them in order
        if (event.eventInterceptor.has(eventName)) {
            event.eventInterceptor
                .get(eventName)
                .forEach((callback) => {
                // Update the payload with each interceptor’s return value
                payload = callback(payload);
                this.log("interceptor", payload, scope, eventName);
            });
        }
        // Return the final payload after interception
        return { payload };
    }
}
