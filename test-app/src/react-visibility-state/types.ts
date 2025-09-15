/**
 * Engine state enumeration representing the power state of the visibility engine
 *
 * This enum defines the two possible states that an engine can be in:
 * - ON: Engine is active and running
 * - OFF: Engine is inactive and stopped
 */
export enum ENGINE_STATE {
  /** Engine is active and running */
  ON = "on",
  /** Engine is inactive and stopped */
  OFF = "off",
}

/**
 * Configuration object for creating a visibility engine
 *
 * This type defines the required parameters when initializing a new
 * visibility engine instance.
 *
 * @example
 * ```typescript
 * const config: VisibilityConfig = {
 *   name: "my-visibility-engine",
 *   initState: ENGINE_STATE.OFF
 * };
 * ```
 */
export type VisibilityConfig = {
  /** Unique identifier for the engine instance */
  name: string;
  /** Initial state of the engine when created */
  initState: ENGINE_STATE;
};
