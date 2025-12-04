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
export type middlewareParamsType = { use: string; value: any };
export type middlewareOnPublishParamsType = {
  eventName: string;
  payload: onChangePayload;
  use: string;
  value: any;
};
export type middlewareOnPublishResolveParamsType = (
  value: any,
  message: any
) => any;
export type middlewareType = {
  resolve: (params: middlewareOnPublishResolveParamsType) => void;
  reject: () => void;
  skip: () => void;
};
// END MIDDLEWARE TYPES

export interface IToggleModel {
  open: (message?: any) => void;
  close: (message?: any) => void;
  middleware: ({ use, value }: { use: string; value: any }) => () => void;
  onChangeSync: (notify: () => void) => () => void;
  onChange: (callback: (payload: IEvent) => void) => () => void;
  getMessage: () => any;
  getValue: () => boolean;
}

export type storeConfig = {
  log: boolean;
  middlewares: {
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
