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

// MIDDLEWARE TYPES
export type interceptorParamsType = { middleware: string; value: any };
export type onPublishParamsType = {
  eventName: string;
  payload: onChangePayload;
  middleware: string;
  value: any;
};
export type onPublishResolveParamsType = (value: any, message: any) => any;
export type middlewareType = {
  resolve: (params: onPublishResolveParamsType) => void;
  reject: () => void;
  skip: () => void;
};
// END MIDDLEWARE TYPES

export interface IToggleModel {
  open: (message?: any) => void;
  close: (message?: any) => void;
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
  applyMiddleware: {
    [key: string]: (
      middleware: middlewareType,
      state: onChangePayload["open"]
    ) => void;
  };
};

export type StoreModel = {
  model: IToggleModel;
};
export type StoreType = Map<string, StoreModel>;

export type { IEvent };
export { EventName };
