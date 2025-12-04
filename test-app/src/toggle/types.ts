enum EventName {
  ON_CHANGE = "onChange",
}
export type onChangePayload = { open: boolean; message?: any };
interface IEvent {
  scope: string;
  eventName: string;
  payload: onChangePayload;
}

export type toggleConfigType = {
  id: string;
  initialState: boolean;
};

// INTERCEPTOR TYPES
export type interceptorParamsType = { middleware: string; value: any };
export type onPublishParamsType = {
  eventName: string;
  payload: onChangePayload;
  middleware: string;
  value: any;
};
export type onPublishResolveParamsType = (value: any, message: any) => any;
// END INTERCEPTOR TYPES

export interface IToggleModel {
  open: (message?: any) => void;
  close: (message?: any) => void;
  subscribe: (
    eventName: EventName.ON_CHANGE,
    callback: (payload: IEvent) => void
  ) => () => void;
  interceptor: ({
    middleware,
    value,
  }: {
    middleware: string;
    value: any;
  }) => () => void;
  onChangeSync: (notify: () => void) => () => void;
  onChange: (callback: (payload: IEvent) => void) => () => void;
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

export type { IEvent };
export { EventName };
