import { createScopedObserver } from "@scoped-observer/core";
import type { IScopedObserver } from "../scroped-observer";
import { VISIBILITY_SCOPE, VISIBILITY_EVENT_NAME } from "./constants";
import { VISIBILITY_STATE } from "./types";

class VisibilityInstance {
  private name: string;
  private _state: VISIBILITY_STATE;
  private _payload: any;
  private eventManager: IScopedObserver = createScopedObserver([
    {
      scope: VISIBILITY_SCOPE,
    },
  ]);

  constructor(name: string, state: VISIBILITY_STATE) {
    this._state = state;
    this.name = name;
  }

  subscribe = (notify: () => void) => {
    return this.eventManager.subscribe({
      scope: VISIBILITY_SCOPE,
      eventName: VISIBILITY_EVENT_NAME.VISIBILITY_CHANGE,
      callback: ({
        payload,
      }: {
        payload: { value: VISIBILITY_STATE; data: any };
      }) => {
        const { value, data } = payload;
        this._state = value;
        this._payload = data;
        notify();
      },
    });
  };

  dispatch = (payload: { value: VISIBILITY_STATE; data: any }) => {
    this.eventManager.dispatch({
      scope: VISIBILITY_SCOPE,
      eventName: VISIBILITY_EVENT_NAME.VISIBILITY_CHANGE,
      payload,
    });
  };

  getState = () => {
    return this._state;
  };

  getPayload = () => {
    return this._payload;
  };
}

export { VisibilityInstance };
