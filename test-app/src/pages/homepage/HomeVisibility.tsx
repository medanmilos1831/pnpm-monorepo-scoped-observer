import { useEffect } from "react";
import {
  getVisibilityClient,
  useVisibilitySelector,
  useCommands,
  useVisibility,
} from "../../visibilityService";
const Inner = () => {
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
const SomeComponent = () => {
  const visibility = useVisibilitySelector("test");
  useEffect(() => {
    if (!visibility) return;
    visibility?.addEventListener("onVisibilityChange", () => {
      console.log("visibility");
    });
  }, [visibility]);
  return (
    <div>
      <h1>Some Component</h1>
    </div>
  );
};
const HomeVisibility = () => {
  return (
    <>
      <SomeComponent />
      <Inner />
    </>
  );
};

export default HomeVisibility;
