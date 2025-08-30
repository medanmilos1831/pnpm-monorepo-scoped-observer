/**
 * Interface representing a visibility instance.
 * Used for typing utility functions and other operations.
 */
export interface IVisibilityInstance {
  name: string;
  machine: any;
  state: "open" | "close";
  payload: any;
  initState: "open" | "close";
  onChange?: (data: VisibilityData) => void;
}

export type VisibilityConfig = Pick<
  IVisibilityInstance,
  "initState" | "onChange"
>;

export type VisibilityHandlerChildrenProps = {
  name: string;
  state: "open" | "close";
  payload: any;
  close: () => void;
};

export type VisibilityHandlerProps<T extends readonly string[]> = {
  children: (props: VisibilityData) => JSX.Element;
  name: T[number];
};

// Visibility data object type (same as onChange receives)
export type VisibilityData = Pick<
  IVisibilityInstance,
  "name" | "state" | "payload"
>;
