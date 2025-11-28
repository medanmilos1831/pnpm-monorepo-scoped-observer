import { useEffect } from "react";
import { createToggleClient } from "../toggle";

const { useToggle, getToggleCommands, useToggleSelector } =
  createToggleClient();

const ComponentOne = () => {
  const toggle = useToggle({ id: "toggleOne", initState: "on" });
  return <div>Toggle: {toggle}</div>;
};

const ComponentTwo = () => {
  const { onOpen, onClose, onToggle } = getToggleCommands("toggleOne");
  return (
    <div>
      <button onClick={onToggle}>Toggle</button>
    </div>
  );
};

const ComponentThree = () => {
  const client = useToggleSelector("toggleOne");
  useEffect(() => {
    const unsubscribe = client?.onChange(() => {
      // State changed
    });
    return () => {
      unsubscribe?.();
    };
  }, [client]);
  return <div></div>;
};

const HomePageToggle = () => {
  return (
    <div>
      <ComponentOne />
      <ComponentTwo />
      <ComponentThree />
    </div>
  );
};

export { HomePageToggle };
