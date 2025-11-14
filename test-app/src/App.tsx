import { HomePage } from "./pages/HomePage";

import { createScopedObserver } from "./scoped-observer";
import { createMessageBroker } from "./message-broker";

const scopedObserver = createScopedObserver([{ scope: "test-app" }]);
const messageBroker = createMessageBroker(scopedObserver, "test-app");

messageBroker.interceptor({
  eventName: "user-updated",
  onPublish: ({ payload }) => {
    return {
      eventName: "user-updated",
      payload: {
        ...payload,
        timestamp: Date.now(),
      },
    };
  },
  onSubscribe: ({ eventName }) => {
    return { eventName };
  },
});

messageBroker.subscribe({
  eventName: "user-updated",
  callback: (payload) => {
    console.log("Primljen payload:", payload);
  },
});

messageBroker.publish({
  eventName: "user-updated",
  payload: { name: "John", age: 30 },
});

function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "black",
        color: "white",
      }}
    >
      <HomePage />
    </div>
  );
}

export default App;
