import { useState } from "react";
import { createToggleClient } from "../toggle";

const { useToggle, useToggleCommands, useToggleSelector } =
  createToggleClient();

const Wrapper = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {count % 2 === 0 ? <ComponentOne /> : "nema"}
    </div>
  );
};

const ComponentOne = () => {
  const toggle = useToggle({ id: "toggleOne", initState: "on" });
  console.log("toggle", toggle);
  return <div></div>;
};

const ComponentTwo = () => {
  const commands = useToggleCommands("toggleOne");
  return (
    <div>
      <button
        onClick={() => {
          commands.onOpen();
        }}
      >
        Open
      </button>
      <button
        onClick={() => {
          commands.onClose();
        }}
      >
        Close
      </button>
      <button
        onClick={() => {
          commands.onToggle();
        }}
      >
        Toggle
      </button>
    </div>
  );
};

const ComponentThree = () => {
  const client = useToggleSelector("toggleOne");
  console.log(client);
  return <div></div>;
};

const HomePageCore = () => {
  return (
    <div>
      <div>
        <Wrapper />
      </div>
      <div>
        <ComponentTwo />
      </div>
      <div>
        <ComponentThree />
      </div>
    </div>
  );
};

export { HomePageCore };
