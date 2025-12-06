import { createModelContext } from "./context";
import {
  EventName,
  type IEvent,
  type storeConfig,
  type toggleConfigType,
} from "../types";

const model = (params: toggleConfigType, config: storeConfig) => {
  const context = createModelContext(params, config);
  const {
    setMessage,
    getMessage,
    middleware,
    getInitialState,
    setInitialState,
    publish,
    subscribe,
    logAction,
  } = context;
  function publishHandler(open: boolean, message?: any) {
    setMessage(message);
    setInitialState(open);
    const payload = {
      open,
      message,
    };
    publish({
      eventName: EventName.ON_CHANGE,
      payload,
    });
    return {
      id: params.id,
      eventName: EventName.ON_CHANGE,
      payload,
    };
  }
  return {
    open: logAction((message?: any) => {
      return publishHandler(true, message);
    }),
    close: logAction((message?: any) => {
      return publishHandler(false, message);
    }),
    middleware,
    onChangeSync: (callback: () => void) => {
      return subscribe({
        eventName: EventName.ON_CHANGE,
        callback,
      });
    },
    onChange: (callback: (event: IEvent) => void) => {
      return subscribe({
        eventName: EventName.ON_CHANGE,
        callback,
      });
    },
    getMessage: getMessage,
    getValue: getInitialState,
  };
};

export { model };
