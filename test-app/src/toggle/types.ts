enum EventName {
  ON_CHANGE = "onChange",
}
type onChangePayload = {
  open: boolean;
  message?: any;
};
type EventPayload = {
  payload: onChangePayload;
  eventName: string;
  scope: string;
};

export type LoggerParams = {
  scope: string;
  eventName: string;
  payload: any;
};

export type InterceptorAction = "open" | "close";

export type toggleConfigType = {
  id: string;
  initialState: boolean;
};

export interface IToggleModel {
  open: (message?: any) => void;
  close: (message?: any) => void;
  subscribe: (
    eventName: EventName.ON_CHANGE,
    callback: (payload: EventPayload) => void
  ) => () => void;
  interceptor: (
    callback: (payload: any) => boolean | { payload: any },
    action?: InterceptorAction
  ) => () => void;
  onChangeSync: (notify: () => void) => () => void;
  onChange: (callback: (payload: EventPayload) => void) => () => void;
  getMessage: () => any;
  getValue: () => boolean;
}

export type storeConfig = {
  onCreate: (params: toggleConfigType) => toggleConfigType;
};

export type { EventPayload };
export { EventName };
