export class EventEntity extends EventTarget {
    constructor(name, log) {
        super();
        this.eventInterceptor = new Map();
        this.scopedEvents = {};
        this.listeners = new Map();
        this.log = false;
        this.dispatch = ({ eventName, payload = undefined, }) => {
            const event = new CustomEvent(eventName, {
                detail: {
                    payload,
                },
            });
            this.dispatchEvent(event);
        };
        this.subscribe = (eventName, callback) => {
            this.addEventListener(eventName, callback);
            if (!this.listeners.has(eventName)) {
                this.listeners.set(eventName, new Set());
            }
            this.listeners.get(eventName).add(callback);
            return () => {
                this.removeEventListener(eventName, callback);
                this.listeners.get(eventName).delete(callback);
                if (this.listeners.get(eventName).size === 0) {
                    this.listeners.delete(eventName);
                }
            };
        };
        this.entityName = name;
        this.log = log;
    }
}
