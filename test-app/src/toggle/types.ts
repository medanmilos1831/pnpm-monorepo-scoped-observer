enum EventName {
  ON_CHANGE = "onChange",
}
export type onChangePayload = { open: boolean; message?: any };
interface IOnChangeEvent {
  scope: string;
  eventName: EventName.ON_CHANGE;
  payload: onChangePayload;
}

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
    callback: (payload: IOnChangeEvent) => void
  ) => () => void;
  interceptor: ({
    middleware,
    value,
  }: {
    middleware: string;
    value: any;
  }) => () => void;
  onChangeSync: (notify: () => void) => () => void;
  onChange: (callback: (payload: IOnChangeEvent) => void) => () => void;
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

export type { IOnChangeEvent };
export { EventName };
