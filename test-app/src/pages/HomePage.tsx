import { useVisibility, useVisibilityCommands } from "../toggleService";
const HomePage = () => {
  const visibility = useVisibility({ id: "toggle-1", initState: "on" });
  const visibilityCommands = useVisibilityCommands("toggle-1");
  return (
    <div>
      <button onClick={() => visibilityCommands.onOpen()}>Open</button>
      <button onClick={() => visibilityCommands.onClose()}>Close</button>
      <button onClick={() => visibilityCommands.onToggle()}>Toggle</button>
    </div>
  );
};

export { HomePage };
