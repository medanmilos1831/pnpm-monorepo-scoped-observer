import { useEffect } from "react";
import {
  useCommands,
  useVisibility,
  useVisibilitySelector,
} from "../../visibilityService";
const Inner = () => {
  const visibility = useVisibility({
    id: "test",
    initState: "off",
  });
  const visibilityTwo = useVisibility({
    id: "testtwo",
    initState: "off",
  });
  const commands = useCommands("test");
  console.log("RENDER", visibility);
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
  // const visibility = useVisibilitySelector("test");
  // useEffect(() => {
  //   if (!visibility) return;
  //   visibility?.addEventListener("onVisibilityChange", (payload: any) => {
  //     // Visibility changed
  //     console.log("Visibility changed", payload);
  //   });
  // }, [visibility]);
  return (
    <div>
      <h1>Visibility selector</h1>
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
