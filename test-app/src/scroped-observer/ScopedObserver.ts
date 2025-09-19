import { EventEntity } from "./EventEntity";
import type { actionType, interceptorType, subscribeType } from "./types";

export class ScopedObserver {
  events: { [key: string]: EventEntity } = {};
  protected log(
    type: "dispatch" | "subscribe" | "interceptor",
    payload: any,
    scope: string,
    eventName: string
  ) {
    // Logging disabled
  }

  findScope(scope: string) {
    const scopes = scope.split(":").filter(Boolean);
    let current = this.events;
    for (let i = 0; i < scopes.length; i++) {
      const key = scopes[i];
      if (!current[key]) {
        // Scope not found
        return undefined;
      }

      if (i === scopes.length - 1) {
        return current[key];
      } else {
        current = current[key].scopedEvents;
      }
    }
  }

  scopedObserverAction = ({ scope, eventName, payload }: actionType) => {
    let entity = this.findScope(scope);
    if (!entity) return;
    if (!entity.listeners.has(eventName)) {
      entity.lastEventPayloads.set(eventName, payload);
    }
    if (entity.log) {
      this.log("dispatch", payload, scope, eventName);
    }
    if (!entity.listeners.has(eventName)) {
      return;
    }
    entity.dispatch({
      eventName,
      payload,
    });
  };

  scopedObserverSubscribe = ({ scope, eventName, callback }: subscribeType) => {
    let entity = this.findScope(scope);
    let unsubscribe: () => void = () => {};
    if (!entity) return unsubscribe;
    if (entity.lastEventPayloads.has(eventName)) {
      callback({ payload: entity.lastEventPayloads.get(eventName) });
    }
    unsubscribe = entity.subscribe(eventName, (e: any) => {
      callback(
        entity.eventInterceptor.has(eventName)
          ? this.runInterceptor(entity, e.detail, scope, eventName)
          : { payload: e.detail.payload }
      );
      if (entity.log) {
        this.log("subscribe", e.detail.payload, scope, eventName);
      }
    });
    return unsubscribe;
  };

  scopedObserverInterceptor = ({
    scope,
    eventName,
    callback,
  }: interceptorType) => {
    let entity = this.findScope(scope);
    if (!entity) return;
    if (!entity.eventInterceptor.has(eventName)) {
      entity.eventInterceptor.set(eventName, []);
    }

    entity.eventInterceptor.get(eventName)!.push(callback);
  };

  private runInterceptor(
    event: EventEntity,
    eventDetail: any,
    scope: string,
    eventName: interceptorType["eventName"]
  ) {
    let payload = eventDetail.payload;

    // If interceptors exist for the event, run them in order
    if (event.eventInterceptor.has(eventName)) {
      event.eventInterceptor
        .get(eventName)!
        .forEach((callback: interceptorType["callback"]) => {
          // Update the payload with each interceptor’s return value

          payload = callback(payload);
          // this.log("interceptor", payload, scope, eventName);
        });
    }

    // Return the final payload after interception
    return { payload };
  }

  logging = () => {};
}
