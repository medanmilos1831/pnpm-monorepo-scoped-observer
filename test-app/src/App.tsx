import { HomePage } from "./pages/HomePage";

import { createScopedObserver } from "./scoped-observer";
import { createMessageBroker } from "./message-broker";
let scopedObserver = createScopedObserver([{ scope: "test-app" }]);
const messageBroker = createMessageBroker(scopedObserver, "test-app");
console.log(messageBroker);
// scopedObserver.dispatch({
//   eventName: "name",
//   payload: {
//     name: "John",
//   },
// });
// const unsubscribe = scopedObserver.subscribe({
//   eventName: "name",
//   callback: (payload) => {
//     console.log("SUBSCRIBED", payload);
//   },
// });

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
