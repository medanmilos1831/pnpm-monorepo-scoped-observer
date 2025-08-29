import React from "react";

/**
 * Interface representing a visibility instance.
 * Used for typing utility functions and other operations.
 */
export interface IVisibilityInstance {
  name: string;
  machine: any;
  currentState: "open" | "close";
  currentPayload: any;
  initState: "open" | "close";
}

/**
 * Configuration type for visibility instances.
 */
export type VisibilityConfig = Pick<
  IVisibilityInstance,
  "initState"
>;

/**
 * Visibility data object type (same as onChange receives).
 */
export type VisibilityData = Pick<
  IVisibilityInstance,
  | "name"
  | "currentState"
  | "currentPayload"
  | "initState"
>;

/**
 * Props for VisibilityHandler component.
 */
export type VisibilityHandlerProps<T extends readonly string[]> = {
  children: (props: VisibilityHandlerChildrenProps) => JSX.Element;
  name: T[number];
};

/**
 * Children props for VisibilityHandler.
 */
export type VisibilityHandlerChildrenProps = VisibilityData & {
  state: "open" | "close";
  payload: any;
  open: (payload?: any) => void;
  close: () => void;
  reset: () => void;
};

/**
 * Return type for useWatch hook.
 */
export type UseWatchReturn<C> = C extends undefined
  ? VisibilityData & {
      open: (payload?: any) => void;
      close: () => void;
      reset: () => void;
    }
  : VisibilityData & {
      callbackValue: C;
      open: (payload?: any) => void;
      close: () => void;
      reset: () => void;
    };
