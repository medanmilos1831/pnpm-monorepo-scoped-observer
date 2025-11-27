import { createToggleClient } from "../toggle";

const { useToggle, useToggleCommands, useToggleSelector } =
  createToggleClient();

const ComponentOne = () => {
  const toggleModule = useToggleSelector("toggleOne");
  const toggle = useToggle({ id: "toggleOne", initState: "on" });
  console.log("TOGGLE", toggle);
  console.log("TOGGLE MODULE", toggleModule);
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
