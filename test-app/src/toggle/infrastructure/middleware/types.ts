import type { onChangePayload } from "../../types";

export type middlewareParamsType = { use: string; value: any };

export type middlewareType = (
  middleware: {
    resolve: (callback: (value: any, message: any) => any) => void;
    reject: () => void;
  },
  state: onChangePayload["open"]
) => void;
export type middlewareStoreConfigType = {
  [key: string]: middlewareType;
};
