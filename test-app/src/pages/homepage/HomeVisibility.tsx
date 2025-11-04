import { useCommands, useVisibility } from "../../visibilityService";
const HomeVisibility = () => {
  const visibility = useVisibility({
    id: "test",
    initState: "on",
  });
  const commands = useCommands("test");
  console.log("visibility", visibility);
  return (
    <div>
      <h1>Visibility: {visibility.visibility}</h1>
      <button
        onClick={() => {
          commands.on();
        }}
      >
        On
      </button>
      <button
        onClick={() => {
          commands.off();
        }}
      >
        Off
      </button>
      <button
        onClick={() => {
          commands.toggle();
        }}
      >
        Toggle
      </button>
    </div>
  );
};

export default HomeVisibility;
