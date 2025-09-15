import { createScopedObserver } from "@scoped-observer/core";
import type { IScopedObserver } from "../scroped-observer";
import { VISIBILITY_SCOPE, VISIBILITY_EVENT_NAME } from "./constants";
import { VISIBILITY_STATE } from "./types";

/**
 * VisibilityEngine represents a single visibility item with its state and event management.
 * This class handles the internal state management and event dispatching for visibility changes.
 * It uses a scoped observer pattern to manage state changes and notify subscribers.
 *
 * @example
 * ```tsx
 * const engine = new VisibilityEngine("modal", "close");
 *
 * // Subscribe to state changes
 * const unsubscribe = engine.subscribe(() => {
 *   console.log("State changed:", engine.getState());
 * });
 *
 * // Dispatch state change
 * engine.dispatch({ value: "open", data: { title: "My Modal" } });
 *
 * // Clean up
 * unsubscribe();
 * ```
 */
class VisibilityEngine {
  /** Unique name identifier for this visibility instance */
  private name: string;
  /** Current visibility state */
  private _state: VISIBILITY_STATE;
  /** Current payload data associated with this visibility instance */
  private _payload: any;
  /** Event manager for handling state changes and subscriptions */
  private eventManager: IScopedObserver = createScopedObserver([
    {
      scope: VISIBILITY_SCOPE,
    },
  ]);

  /**
   * Creates a new VisibilityEngine with the specified name and initial state.
   *
   * @param {string} name - Unique identifier for this visibility engine
   * @param {VISIBILITY_STATE} state - Initial visibility state
   */
  constructor(name: string, state: VISIBILITY_STATE) {
    this._state = state;
    this.name = name;
  }

  /**
   * Subscribes to visibility state changes.
   * When the state changes, the provided callback will be invoked.
   *
   * @param {Function} notify - Callback function to be called when state changes
   * @returns {Function} Unsubscribe function to stop listening to state changes
   *
   * @example
   * ```tsx
   * const unsubscribe = engine.subscribe(() => {
   *   console.log("Visibility state changed:", engine.getState());
   * });
   *
   * // Later, when you want to stop listening
   * unsubscribe();
   * ```
   */
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

  /**
   * Dispatches a visibility state change event.
   * This will update the internal state and notify all subscribers.
   *
   * @param {Object} payload - State change payload
   * @param {VISIBILITY_STATE} payload.value - New visibility state
   * @param {any} payload.data - Optional payload data to associate with the state change
   *
   * @example
   * ```tsx
   * // Open with payload
   * engine.dispatch({ value: "open", data: { title: "My Modal" } });
   *
   * // Close without payload
   * engine.dispatch({ value: "close", data: null });
   * ```
   */
  dispatch = (payload: { value: VISIBILITY_STATE; data: any }) => {
    this.eventManager.dispatch({
      scope: VISIBILITY_SCOPE,
      eventName: VISIBILITY_EVENT_NAME.VISIBILITY_CHANGE,
      payload,
    });
  };

  /**
   * Gets the current visibility state.
   *
   * @returns {VISIBILITY_STATE} Current visibility state ("open" or "close")
   *
   * @example
   * ```tsx
   * const currentState = engine.getState();
   * console.log(currentState); // "open" or "close"
   * ```
   */
  getState = () => {
    return this._state;
  };

  /**
   * Gets the current payload data associated with this visibility engine.
   *
   * @returns {any} Current payload data
   *
   * @example
   * ```tsx
   * const payload = engine.getPayload();
   * console.log(payload); // { title: "My Modal" } or null
   * ```
   */
  getPayload = () => {
    return this._payload;
  };
}

export { VisibilityEngine };
