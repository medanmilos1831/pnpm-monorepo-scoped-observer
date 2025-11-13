import { HomePage } from "./pages/HomePage";

import { createScopedObserver } from "./scoped-observer-v2";
let scopedObserver = createScopedObserver([
  {
    scope: "country",
    subScopes: [
      {
        scope: "code",
        subScopes: [
          {
            scope: "city",
          },
          {
            scope: "name",
          },
        ],
      },
    ],
  },
  {
    scope: "person",
    subScopes: [
      {
        scope: "fname",
        subScopes: [
          {
            scope: "city",
          },
          {
            scope: "phone",
          },
        ],
      },
    ],
  },
]);
scopedObserver.dispatch({
  eventName: "name",
  payload: {
    name: "John",
  },
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
