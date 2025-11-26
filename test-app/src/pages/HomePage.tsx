import { useEffect } from "react";
import { quantumUiReact } from "../quantum-ui-react";

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

  useEffect(() => {
    const unsubscribe = counter?.subscribe(({ prevState, newState }) => {
      console.log(prevState, newState);
    });
    return () => {
      unsubscribe?.();
    };
  }, [counter]);
  console.log(counter);
  return (
    <div>
      COUNTER
      <button onClick={() => counter?.setState((state) => state + 1)}>
        click me
      </button>
    </div>
  );
};

export { HomePage };
