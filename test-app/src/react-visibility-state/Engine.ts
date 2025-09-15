import { createScopedObserver } from "@scoped-observer/core";
import type { IScopedObserver } from "../scroped-observer";
import { VISIBILITY_OBSERVER, EVENTS } from "./constants";
import { ENGINE_STATE } from "./types";

/**
 * Engine class represents a visibility engine that can be turned on/off
 * and manages state changes through a scoped observer pattern.
 *
 * This engine acts as a centralized state manager for visibility functionality,
 * allowing components to subscribe to state changes and dispatch new states.
 *
 * @example
 * ```typescript
 * const engine = new Engine("my-visibility-engine", ENGINE_STATE.OFF);
 *
 * // Subscribe to state changes
 * const unsubscribe = engine.subscribe(() => {
 *   console.log("Engine state changed:", engine.getState());
 * });
 *
 * // Turn on the engine
 * engine.dispatch({ value: ENGINE_STATE.ON, data: { reason: "user-action" } });
 *
 * // Cleanup
 * unsubscribe();
 * ```
 */
class Engine {
  /** Unique identifier for this engine instance */
  private name: string;

  /** Current state of the engine (ON/OFF) */
  private _state: ENGINE_STATE;

  /** Additional data payload associated with the current state */
  private _payload: any;

  /** Scoped observer instance for managing state change events */
  private observer: IScopedObserver = createScopedObserver([
    {
      scope: VISIBILITY_OBSERVER, // Uses the global visibility observer scope
    },
  ]);

  /**
   * Creates a new Engine instance
   *
   * @param name - Unique identifier for this engine
   * @param state - Initial state of the engine (ON or OFF)
   */
  constructor(name: string, state: ENGINE_STATE) {
    this._state = state;
    this.name = name;
  }

  /**
   * Subscribes to engine state changes
   *
   * When the engine state changes (ON/OFF), the provided callback will be invoked
   * with the new state and any associated data.
   *
   * @param notify - Callback function to execute when state changes
   * @returns Unsubscribe function to remove the listener
   *
   * @example
   * ```typescript
   * const unsubscribe = engine.subscribe(() => {
   *   console.log("Engine is now:", engine.getState());
   *   console.log("With data:", engine.getPayload());
   * });
   * ```
   */
  subscribe = (notify: () => void) => {
    return this.observer.subscribe({
      scope: VISIBILITY_OBSERVER,
      eventName: EVENTS.ENGINE_POWER, // Listens for engine power events
      callback: ({
        payload,
      }: {
        payload: { value: ENGINE_STATE; data: any };
      }) => {
        const { value, data } = payload;

        // Update internal state
        this._state = value;
        if (this._state === ENGINE_STATE.ON) {
          this._payload = data;
        } else {
          setTimeout(() => {
            this._payload = data;
          }, 0);
        }
        // Notify subscribers
        notify();
      },
    });
  };

  /**
   * Dispatches a new engine state change
   *
   * This method broadcasts a state change to all subscribed listeners.
   * It's the primary way to turn the engine on/off and pass associated data.
   *
   * @param payload - Object containing the new state and optional data
   * @param payload.value - New engine state (ON or OFF)
   * @param payload.data - Optional data to associate with this state change
   *
   * @example
   * ```typescript
   * // Turn on the engine with some data
   * engine.dispatch({
   *   value: ENGINE_STATE.ON,
   *   data: { reason: "user-clicked-button", timestamp: Date.now() }
   * });
   *
   * // Turn off the engine
   * engine.dispatch({
   *   value: ENGINE_STATE.OFF,
   *   data: { reason: "component-unmounted" }
   * });
   * ```
   */
  dispatch = (payload: { value: ENGINE_STATE; data: any }) => {
    this.observer.dispatch({
      scope: VISIBILITY_OBSERVER,
      eventName: EVENTS.ENGINE_POWER, // Broadcasts engine power events
      payload,
    });
  };

  /**
   * Gets the current engine state
   *
   * @returns Current engine state (ON or OFF)
   */
  getState = () => {
    return this._state;
  };

  /**
   * Gets the current payload data
   *
   * @returns Current payload data associated with the engine state
   */
  getPayload = () => {
    return this._payload;
  };
}

export { Engine };
