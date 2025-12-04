import type { middlewareStoreConfigType } from "./middleware/types";

enum EventName {
  ON_CHANGE = "onChange",
}
export type onChangePayload = { open: boolean; message?: any };
interface IEvent {
  scope?: string;
  eventName: string;
  payload: onChangePayload;
}

export type toggleConfigType = {
  id: string;
  initialState: boolean;
};

export interface IToggleModel {
  open: (message?: any) => void;
  close: (message?: any) => void;
  middleware:
    | (({ use, value }: { use: string; value: any }) => () => void)
    | undefined;
  onChangeSync: (notify: () => void) => () => void;
  onChange: (callback: (payload: IEvent) => void) => () => void;
  getMessage: () => any;
  getValue: () => boolean;
}

export type storeConfig = {
  log: boolean;
  middlewares?: middlewareStoreConfigType;
};

export type StoreModel = {
  model: IToggleModel;
};
export type StoreType = Map<string, StoreModel>;

export type { IEvent };
export { EventName };
