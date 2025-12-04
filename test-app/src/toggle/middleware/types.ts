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
export type middlewareType = {
  resolve: (params: middlewareOnPublishResolveParamsType) => void;
  reject: () => void;
};
export type middlewareStoreConfigType = {
  [key: string]: (
    middleware: middlewareType,
    state: onChangePayload["open"]
  ) => void;
};
