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
  onChange?: (data: VisibilityData) => void;
}

export type VisibilityConfig = Pick<
  IVisibilityInstance,
  "initState" | "onChange"
>;

export type VisibilityHandlerChildrenProps = VisibilityData & {
  open: (payload?: any) => void;
  close: () => void;
  reset: () => void;
};

export type VisibilityHandlerProps = {
  children: (props: VisibilityHandlerChildrenProps) => JSX.Element;
  name: string;
};

// Visibility data object type (same as onChange receives)
export type VisibilityData = Pick<
  IVisibilityInstance,
  "name" | "currentState" | "currentPayload" | "initState"
>;
