/**
 * Interface representing a visibility instance
 * Defines the contract for visibility objects with state machine and callbacks
 */
export interface IVisibilityInstance {
  /** Unique identifier for the visibility instance */
  name: string;
  /** State machine managing visibility transitions */
  machine: any;
  /** Optional data associated with visibility state */
  payload: any;
  /** Callback function triggered on state changes */
  onChange?: (data: { payload: any; state: VISIBILITY_STATE }) => void;
}

/**
 * Enumeration of possible visibility states
 * Defines the two main states: open and close
 */
export enum VISIBILITY_STATE {
  /** Visibility is open/visible */
  OPEN = "open",
  /** Visibility is closed/hidden */
  CLOSE = "close",
}

/**
 * Configuration object for visibility instances
 * Extends IVisibilityInstance with required initial state
 */
export type VisibilityConfig = Pick<IVisibilityInstance, "onChange"> & {
  /** Initial visibility state when instance is created */
  initState: `${VISIBILITY_STATE}`;
};
