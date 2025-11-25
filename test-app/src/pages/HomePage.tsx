import { quantumUiReact } from "@med1802/quantum-ui-react";
import { useEffect } from "react";

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

const HomePage = () => {
  const counterSelector = useStoreSelector("counter");
  useCreateStore({ id: "counter", state: 0 });

  useEffect(() => {
    counterSelector?.subscribe((payload) => {
      console.log("PAYLOAD", payload);
    });
  });
  counterSelector?.setState((state) => state + 1);
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export { HomePage };
