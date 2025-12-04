enum EventName {
  ON_CHANGE = "onChange",
}
export type onChangePayload = {
  payload: { open: boolean; message?: any };
  message?: any;
};
type EventPayload = {
  payload: onChangePayload;
  eventName: string;
  scope: string;
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
  interceptor: ({
    middleware,
    value,
  }: {
    middleware: string;
    value: any;
  }) => () => void;
  onChangeSync: (notify: () => void) => () => void;
  onChange: (callback: (payload: EventPayload) => void) => () => void;
  getMessage: () => any;
  getValue: () => boolean;
}

export type storeConfig = {
  log: boolean;
  applyMiddleware: { [key: string]: (store: any) => any };
};

export type StoreModel = {
  model: IToggleModel;
};
export type StoreType = Map<string, StoreModel>;

export type { EventPayload };
export { EventName };
