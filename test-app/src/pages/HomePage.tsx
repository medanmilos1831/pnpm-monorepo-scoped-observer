import { createToggleClient } from "../toggle";

const { useToggle, useToggleCommands } = createToggleClient();

const ComponentOne = () => {
  const toggle = useToggle({ id: "toggleOne", initState: "off" });
  return <div></div>;
};

const ComponentTwo = () => {
  const commands = useToggleCommands("toggleOne");
  return (
    <div>
      <button onClick={() => {}}>Open</button>
      <button onClick={() => {}}>Close</button>
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
