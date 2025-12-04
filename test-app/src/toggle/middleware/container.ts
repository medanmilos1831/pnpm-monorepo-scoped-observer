import type {
  middlewareOnPublishParamsType,
  middlewareOnPublishResolveParamsType,
} from "./types";

const createMiddlewareContainer = (params: middlewareOnPublishParamsType) => {
  const { eventName, payload, use, value } = params;
  let state = {
    eventName,
    payload,
    use,
    value,
    status: true,
  };
  function resolve(params: middlewareOnPublishResolveParamsType) {
    let result = params(value, payload.message);
    state = {
      ...state,
      payload: {
        open: payload.open,
        message: result,
      },
    };
  }

  function reject() {
    state = {
      ...state,
      status: false,
    };
  }

  function result() {
    if (state.status) {
      return {
        eventName,
        payload,
      };
    }
    return state.status;
  }
  return {
    result,
    resolve,
    reject,
  };
};

export { createMiddlewareContainer };
