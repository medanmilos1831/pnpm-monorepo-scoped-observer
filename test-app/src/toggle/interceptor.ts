import type { createMessageBroker } from "@med1802/scoped-observer-message-broker";
import type { storeConfig } from "./types";
import { EventName } from "@med1802/react-toggle-observer/dist/types";

const createInterceptor = (
  config: storeConfig,
  messageBroker: ReturnType<typeof createMessageBroker>
) => {
  function onPublish({
    eventName,
    payload,
    middleware,
    value,
  }: {
    eventName: string;
    payload: any;
    middleware: string;
    value: any;
  }) {
    let state = {
      eventName,
      payload,
    } as any;
    config.applyMiddleware[middleware]({
      resolve(params: any) {
        let result = params(value, payload.message);
        state = {
          eventName,
          payload: {
            open: payload.open,
            message: result,
          },
        };
      },
      reject() {
        state = false;
      },
      skip() {
        state = {
          eventName,
          payload,
        };
      },
    });
    console.log("state", state);
    return state;
  }
  return {
    interceptorNew: ({ middleware, value }: any) => {
      return messageBroker.interceptor({
        eventName: EventName.ON_CHANGE,
        onPublish: ({ eventName, payload }) => {
          const result = onPublish({ eventName, payload, middleware, value });
          return result;
        },
      });
    },
  };
};

export { createInterceptor };
