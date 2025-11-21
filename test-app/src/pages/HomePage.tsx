import { createScopedObserver } from "../scoped-observer";
import { createMessageBroker } from "../scoped-observer-message-broker";
const scopedObserver = createScopedObserver();
const messageBroker = createMessageBroker(scopedObserver);
let r = 12;
messageBroker.interceptor({
  eventName: "increment",
  onPublish: ({ eventName, payload }) => {
    if (r == 12) {
      return {
        eventName,
        payload,
      };
    }
    return {
      eventName,
      payload: {
        incrementBy: payload,
        timestamp: Date.now(),
        multiplier: 2,
        random: Math.random(),
      },
    };
  },
});

messageBroker.subscribe({
  eventName: "increment",
  callback: (payload) => {
    console.log(JSON.stringify(payload, null, 2));
  },
});
// setTimeout(() => {
//   messageBroker.publish({
//     eventName: "increment",
//     payload: 1,
//   });
// }, 2000);
messageBroker.publish({
  eventName: "increment",
  payload: 1,
});
// scopedObserver.subscribe({
//   eventName: "increment",
//   callback: (payload) => {
//     console.log(payload);
//   },
// });
// scopedObserver.dispatch({
//   eventName: "increment",
//   payload: 1,
// });
const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export { HomePage };
