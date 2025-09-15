import { useEffect, useState } from "react";
import {
  createBrowserVisibility,
  VisibilityProvider,
} from "./react-visibility-state-new";
import { HomePage } from "./pages";
import { visibility } from "./visibilityService";
function App() {
  return (
    <>
      <VisibilityProvider value={visibility}>
        <HomePage />
      </VisibilityProvider>
      {/* <h1>Counter: {counter}</h1>
      <br />
      <br />
      <hr />
      {counter % 2 === 0 ? (
        <VisibilityHandler name="modalOne">
          {({ state }) => {
            return <div>Hello World {state}</div>;
          }}
        </VisibilityHandler>
      ) : null}
      <hr />
      <button onClick={() => open("modalOne")}>open</button>
      <button onClick={() => close("modalOne")}>close</button>
      <button onClick={() => setCounter(counter + 1)}>increment</button> */}
    </>
  );
}

export default App;
