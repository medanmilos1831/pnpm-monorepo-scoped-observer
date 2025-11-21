import { createScopedObserver } from "../scoped-observer";
import { createMessageBroker } from "../scoped-observer-message-broker";
const scopedObserver = createScopedObserver();
const messageBroker = createMessageBroker(scopedObserver);
messageBroker.interceptor({
  eventName: "increment",
  onPublish: ({ eventName, payload }) => {
    console.log("PIPELINE 1", payload);
    return {
      eventName,
      payload: {
        ulazni: payload,
        prvi: "prvi",
      },
    };
  },
});

messageBroker.interceptor({
  eventName: "increment",
  onPublish: ({ eventName, payload }) => {
    console.log("INTERCEPTOR", payload);
    return {
      eventName,
      payload: {
        ...payload,
        treci: "treci",
      },
    };
  },
});
messageBroker.subscribe({
  eventName: "increment",
  callback: (payload) => {
    console.log("SUBSCRIBE", JSON.stringify(payload, null, 2));
  },
});
messageBroker.publish({
  eventName: "increment",
  payload: 1,
});
const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export { HomePage };
