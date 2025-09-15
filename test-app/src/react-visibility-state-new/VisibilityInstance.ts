import { createScopedObserver } from "@scoped-observer/core";
import type { IScopedObserver } from "../scroped-observer";
import { VISIBILITY_SCOPE, VISIBILITY_EVENT_NAME } from "./constants";
import { VISIBILITY_STATE } from "./types";

class VisibilityInstance {
  private name: string;
  private _state: VISIBILITY_STATE;
  eventManager: IScopedObserver = createScopedObserver([
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
        const { value } = payload;
        this._state = value;
        notify();
      },
    });
  };

  getState = () => {
    return this._state;
  };

  // getState = () => {
  //   return this.state;
  // };
}

export { VisibilityInstance };
