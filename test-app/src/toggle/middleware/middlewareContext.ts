import type { onChangePayload } from "../types";
import type {
  middlewareOnPublishResolveParamsType,
  middlewareType,
} from "./types";

const createMiddlewareContext = (payload: onChangePayload, value: any) => {
  let state = {
    payload,
    status: true,
  };
  return (middleware: middlewareType) => {
    middleware(
      {
        resolve: (params: middlewareOnPublishResolveParamsType) => {
          let result = params(value, payload.message);
          state.payload.message = result;
        },
        reject: () => {
          state.status = false;
        },
      },
      payload.open
    );
    return state;
  };
};

export { createMiddlewareContext };
