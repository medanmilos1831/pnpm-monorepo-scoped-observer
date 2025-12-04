import { EventName } from "@med1802/react-toggle-observer/dist/types";
import type { createMessageBroker } from "@med1802/scoped-observer-message-broker";
import type { storeConfig } from "../types";
import type { createMessageContainer } from "../messageContainer";
import type {
  middlewareOnPublishParamsType,
  middlewareOnPublishResolveParamsType,
  middlewareParamsType,
  middlewareStoreConfigType,
} from "./types";

const createMiddleware = (
  middlewares: middlewareStoreConfigType,
  messageBroker: ReturnType<typeof createMessageBroker>,
  messageContainer: ReturnType<typeof createMessageContainer>
) => {
  function onPublish(params: middlewareOnPublishParamsType) {
    const { eventName, payload, use, value } = params;
    let state = {
      eventName,
      payload,
      use,
      value,
      status: true,
    };
    middlewares[use](
      {
        resolve(params: middlewareOnPublishResolveParamsType) {
          let result = params(value, payload.message);
          state = {
            ...state,
            payload: {
              open: payload.open,
              message: result,
            },
          };
        },
        reject() {
          state = {
            ...state,
            status: false,
          };
        },
      },
      payload.open
    );
    if (state.status) {
      messageContainer.setMessage(state.payload.message);
      return {
        eventName: state.eventName,
        payload: state.payload,
      };
    }
    return state.status;
  }
  return ({ use, value }: middlewareParamsType) => {
    const unsubscribe = messageBroker.interceptor({
      eventName: EventName.ON_CHANGE,
      onPublish: ({ eventName, payload }) => {
        const result = onPublish({ eventName, payload, use, value });

        return result;
      },
    });
    return () => {
      unsubscribe();
    };
  };
};

export { createMiddleware };
