import type { onChangePayload } from "../types";

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
export type middlewareTypeParams = {
  resolve: (params: middlewareOnPublishResolveParamsType) => void;
  reject: () => void;
};

export type middlewareType = (
  middleware: middlewareTypeParams,
  state: onChangePayload["open"]
) => void;
export type middlewareStoreConfigType = {
  [key: string]: middlewareType;
};
