/**
 * Enum representing the possible visibility states for a visibility item.
 *
 * @enum {string}
 * @example
 * ```tsx
 * // Using the enum values
 * const state = VISIBILITY_STATE.OPEN; // "open"
 * const isOpen = state === VISIBILITY_STATE.OPEN; // true
 * ```
 */
export enum VISIBILITY_STATE {
  /** Item is visible/open */
  OPEN = "open",
  /** Item is hidden/closed */
  CLOSE = "close",
}

/**
 * Configuration object for creating a visibility item.
 * This type defines the required properties when initializing a visibility instance.
 *
 * @typedef {Object} VisibilityConfig
 * @property {string} name - Unique identifier for the visibility item
 * @property {VISIBILITY_STATE} initState - Initial state of the visibility item
 *
 * @example
 * ```tsx
 * const config: VisibilityConfig = {
 *   name: "modal",
 *   initState: VISIBILITY_STATE.CLOSE
 * };
 * ```
 */
export type VisibilityConfig = {
  /** Unique identifier for the visibility item */
  name: string;
  /** Initial state of the visibility item */
  initState: VISIBILITY_STATE;
};
