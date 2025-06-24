export class EventEntity extends EventTarget {
  entityName?: string;
  eventInterceptor: Map<string, ((payload: any) => any)[]> = new Map();
  scopedEvents: Record<string, EventEntity> = {};
  listeners: Map<string, Set<(e: any) => void>> = new Map();
  log = false;

  constructor(name: string, log: boolean) {
    super();
    this.entityName = name;
    this.log = log;
  }

  dispatch = ({
    eventName,
    payload = undefined,
  }: {
    eventName: string;
    payload?: any;
  }) => {
    const event = new CustomEvent(eventName, {
      detail: {
        payload,
      },
    });
    this.dispatchEvent(event);
  };
  subscribe = (eventName: string, callback: (e: any) => void) => {
    this.addEventListener(eventName, callback);
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName)!.add(callback);

    return () => {
      this.removeEventListener(eventName, callback);
      this.listeners.get(eventName)!.delete(callback);
      if (this.listeners.get(eventName)!.size === 0) {
        this.listeners.delete(eventName);
      }
    };
  };
}
