import { EventName } from "@med1802/react-toggle-observer/dist/types";
import type { createMessageBroker } from "@med1802/scoped-observer-message-broker";
import type { createMessageContainer } from "../messageContainer";
import { createMiddlewareContainer } from "./container";
import type {
  middlewareOnPublishParamsType,
  middlewareParamsType,
  middlewareStoreConfigType,
} from "./types";

const createMiddleware = (
  middlewares: middlewareStoreConfigType,
  messageBroker: ReturnType<typeof createMessageBroker>,
  messageContainer: ReturnType<typeof createMessageContainer>
) => {
  function onPublish(params: middlewareOnPublishParamsType) {
    const container = createMiddlewareContainer(params);
    const { payload, use } = params;
    middlewares[use](
      {
        resolve: container.resolve,
        reject: container.reject,
      },
      payload.open
    );
    const state = container.result();
    if (typeof state === "object") {
      messageContainer.setMessage(state.payload.message);
    }
    return state;
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
