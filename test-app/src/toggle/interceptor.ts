import type { createMessageBroker } from "@med1802/scoped-observer-message-broker";
import type { storeConfig } from "./types";
import { EventName } from "@med1802/react-toggle-observer/dist/types";
import type { createMessageContainer } from "./messageContainer";

const createInterceptor = (
  config: storeConfig,
  messageBroker: ReturnType<typeof createMessageBroker>,
  messageContainer: ReturnType<typeof createMessageContainer>
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
    return state;
  }
  return {
    interceptor: ({ middleware, value }: any) => {
      const unsubscribe = messageBroker.interceptor({
        eventName: EventName.ON_CHANGE,
        onPublish: ({ eventName, payload }) => {
          const result = onPublish({ eventName, payload, middleware, value });
          messageContainer.setMessage(result.payload.message);
          return result;
        },
      });
      return () => {
        unsubscribe();
      };
    },
  };
};

export { createInterceptor };
