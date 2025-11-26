import { createToggleClient } from "../toggle";

const { useToggle, useToggleCommands } = createToggleClient();

const ComponentOne = () => {
  const toggle = useToggle({ id: "toggleOne", initState: "off" });
  console.log("toggle", toggle);
  return <div></div>;
};

const ComponentTwo = () => {
  const commands = useToggleCommands("toggleOne");
  console.log("commands", commands);
  return (
    <div>
      <button onClick={() => {}}>Open</button>
      <button onClick={() => {}}>Close</button>
      <button onClick={() => {}}>Toggle</button>
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <div>
        <ComponentOne />
      </div>
      <div>
        <ComponentTwo />
      </div>
    </div>
  );
};

export { HomePage };
