import { EventName } from "@med1802/react-toggle-observer/dist/types";
import type { createMessageBroker } from "@med1802/scoped-observer-message-broker";
import type { createMessageContainer } from "../infrastructure/model/messageContainer";
import { createMiddlewareContext } from "./middlewareContext";
import type { middlewareParamsType, middlewareStoreConfigType } from "./types";

const createMiddleware = (
  middlewares: middlewareStoreConfigType,
  messageBroker: ReturnType<typeof createMessageBroker>,
  messageContainer: ReturnType<typeof createMessageContainer>
) => {
  return ({ use, value }: middlewareParamsType) => {
    const unsubscribe = messageBroker.interceptor({
      eventName: EventName.ON_CHANGE,
      onPublish: (event) => {
        const result = createMiddlewareContext(
          event.payload,
          value
        )(middlewares[use]);
        if (typeof result === "object") {
          messageContainer.setMessage(result.payload.message);
        }
        if (result.status === false) {
          return false;
        }
        return {
          eventName: EventName.ON_CHANGE,
          payload: result.payload,
        };
      },
    });
    return () => {
      unsubscribe();
    };
  };
};

export { createMiddleware };
