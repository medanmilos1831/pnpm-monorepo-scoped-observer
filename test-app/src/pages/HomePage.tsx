import { useEffect } from "react";
import { quantumUiReact } from "@med1802/quantum-ui-react";

const counterModule = quantumUiReact.createModule({
  name: "counter",
  store: ({ id, state }) => ({
    id,
    state,
  }),
});

const HomePage = () => {
  const counter = counterModule.useEntitySelector("counter");
  counterModule.useCreateEntity({ id: "counter", state: 0 });
  console.log(counter);
  useEffect(() => {
    const unsubscribe = counter?.subscribe(({ prevState, newState }) => {
      console.log(prevState, newState);
    });
    return () => {
      unsubscribe?.();
    };
  }, [counter]);
  return <div></div>;
};

export { HomePage };
