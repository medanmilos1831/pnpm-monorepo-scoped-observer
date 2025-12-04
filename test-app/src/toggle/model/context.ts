import { EventName, type storeConfig, type toggleConfigType } from "../types";
import { createInfrastructure } from "./infrastructure";

const createModelContext = (params: toggleConfigType, config: storeConfig) => {
  const infrastructure = createInfrastructure(params, config);
  const {
    scopedObserver,
    messageBroker,
    logger,
    messageContainer,
    middleware,
  } = infrastructure;
  let initialState = params.initialState;
  function setInitialState(state: boolean) {
    initialState = state;
  }
  function getInitialState() {
    return initialState;
  }
  function publishHandler(open: boolean, message?: any) {
    messageContainer.setMessage(message);
    setInitialState(open);
    const payload = {
      open,
      message,
    };
    messageBroker.publish({
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
    scopedObserver,
    messageBroker,
    logger,
    messageContainer,
    middleware,
    setInitialState,
    getInitialState,
    publishHandler,
  };
};

export { createModelContext };
