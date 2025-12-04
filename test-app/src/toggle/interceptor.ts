import type { createMessageBroker } from "@med1802/scoped-observer-message-broker";
import type {
  interceptorParamsType,
  onChangePayload,
  onPublishParamsType,
  onPublishResolveParamsType,
  storeConfig,
} from "./types";
import { EventName } from "@med1802/react-toggle-observer/dist/types";
import type { createMessageContainer } from "./messageContainer";

const createInterceptor = (
  config: storeConfig,
  messageBroker: ReturnType<typeof createMessageBroker>,
  messageContainer: ReturnType<typeof createMessageContainer>
) => {
  function onPublish(params: onPublishParamsType) {
    const { eventName, payload, middleware, value } = params;
    let state = {
      eventName,
      payload,
      middleware,
      value,
      status: true,
    };
    config.applyMiddleware[middleware]({
      resolve(params: onPublishResolveParamsType) {
        let result = params(value, payload.message);
        state = {
          ...state,
          payload: {
            open: payload.open,
            message: result,
          },
        };
        messageContainer.setMessage(state.payload.message);
      },
      reject() {
        state = {
          ...state,
          status: false,
        };
      },
      skip() {
        state = {
          ...state,
          status: true,
        };
        messageContainer.setMessage(state.payload.message);
      },
    });
    if (state.status) {
      return {
        eventName: state.eventName,
        payload: state.payload,
      };
    }
    return state.status;
  }
  return {
    interceptor: ({ middleware, value }: interceptorParamsType) => {
      const unsubscribe = messageBroker.interceptor({
        eventName: EventName.ON_CHANGE,
        onPublish: ({ eventName, payload }) => {
          const result = onPublish({ eventName, payload, middleware, value });

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
