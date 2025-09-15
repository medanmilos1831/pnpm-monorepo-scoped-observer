import React, { useState } from "react";
import { VisibilityProvider } from "../../react-visibility-state-new";
import { useVisibilityHandler } from "../../react-visibility-state-new/Provider/VisibilityProvider";
const ModalOne = () => {
  return <div>Hello World</div>;
};
export const HomePage: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const { open, close } = useVisibilityHandler();
  return (
    <>
      {counter % 2 === 0 && (
        <VisibilityProvider.Item name="modalOne">
          {({ state, payload: Element }) => {
            if (state === "open") {
              return Element;
            }
            return null;
          }}
        </VisibilityProvider.Item>
      )}
      <button onClick={() => open("modalOne", <ModalOne />)}>open</button>
      <button onClick={() => close("modalOne")}>close</button>
      <button onClick={() => setCounter(counter + 1)}>increment</button>
      <h1>Counter: {counter}</h1>
    </>
  );
};
