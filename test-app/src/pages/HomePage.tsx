import { quantumUiReact } from "../quantum-ui-react";
import { useEffect, useState } from "react";

const { useStoreSelector, useCreateStore, getStoreById } =
  quantumUiReact.createModule<number>({
    name: "counter",
    store: (props) => {
      return {
        id: props.id,
        state: props.state,
      };
    },
  });

const ComponentOne = () => {
  const counterStore = useStoreSelector("counter");
  console.log(counterStore);
  return (
    <div>
      <h1>ComponentOne</h1>
    </div>
  );
};

const InnerComponent = () => {
  useCreateStore({ id: "counter", state: 0 });
  return (
    <div>
      <h1>InnerComponent</h1>
    </div>
  );
};

const ComponentTwo = () => {
  const [state, setState] = useState(0);
  return (
    <div>
      <h1>ComponentTwo</h1>
      {state % 2 === 0 ? <InnerComponent /> : "nema storea"}
      <button onClick={() => setState(state + 1)}>Increment</button>
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <ComponentOne />
      <ComponentTwo />
    </div>
  );
};

export { HomePage };
