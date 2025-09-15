import React, { useState } from "react";
import { VisibilityProvider } from "../../react-visibility-state-new";
import { useVisibilityHandler } from "../../react-visibility-state-new/Provider/VisibilityProvider";
const ModalOne = () => {
  return <div>Hello World</div>;
};
export const HomePage: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const { on, off } = useVisibilityHandler();
  return (
    <>
      <VisibilityProvider.Item name="modalOne">
        {({ state, payload: Element }) => {
          console.log("Element", counter);
          if (state === "on") {
            console.log("Element", counter);
            return <Element />;
          }
          return null;
        }}
      </VisibilityProvider.Item>
      <button onClick={() => on("modalOne", () => <ModalOne />)}>open</button>
      <button onClick={() => off("modalOne")}>close</button>
      <button onClick={() => setCounter(counter + 1)}>increment</button>
      <h1>Counter: {counter}</h1>
    </>
  );
};
