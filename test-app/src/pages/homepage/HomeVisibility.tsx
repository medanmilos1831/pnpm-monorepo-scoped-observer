import { createContext, useEffect, useState } from "react";
import {
  useVisibility,
  useVisibilityCommands,
  useModelSelector,
} from "../../visibilityService";

const Inner = () => {
  const visibility = useVisibility({
    id: "test",
    initState: "off",
  });

  const commands = useVisibilityCommands("test");
  return (
    <div>
      <h1>Visibility: {visibility}</h1>

      <button
        onClick={() => {
          commands.onOpen();
        }}
      >
        open
      </button>
      <button
        onClick={() => {
          commands.onClose();
        }}
      >
        close
      </button>
      <button
        onClick={() => {
          commands.onToggle();
        }}
      >
        toggle
      </button>
    </div>
  );
};

const Selector = () => {
  const visibility = useModelSelector("test");
  useEffect(() => {
    if (!visibility) return;
    const unsubscribe = visibility.subscribe("onChange", ({ payload }) => {
      console.log("PAYLOAD", payload);
    });
    return () => {
      unsubscribe();
    };
  });
  return (
    <>
      <h1>Selector</h1>
      <button onClick={() => visibility?.commands?.onToggle()}>toggle</button>
    </>
  );
};
const Wrapper = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {count % 2 === 0 ? <Inner /> : "nema"}
    </>
  );
};
const HomeVisibility = () => {
  return (
    <>
      <Selector />
      <Wrapper />
    </>
  );
};

export default HomeVisibility;
