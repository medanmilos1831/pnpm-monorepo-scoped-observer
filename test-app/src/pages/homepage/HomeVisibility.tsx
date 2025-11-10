import { createContext, useEffect, useState } from "react";
import {
  useVisibility,
  useVisibilityCommands,
  useVisibilitySelector,
} from "../../visibilityService";

const Inner = () => {
  const [count, setCount] = useState(0);
  const visibility = useVisibility({
    id: "test",
    initState: "off",
  });

  // const visibilityTwo = useVisibility({
  //   id: "testtwo",
  //   initState: "on",
  // });
  // const visibilityTwo = useVisibility({
  //   id: "testtwo",
  //   initState: "off",
  // });
  const commands = useVisibilityCommands("test");
  return (
    <div>
      {/* <h1>Visibility: {visibility}</h1> */}
      <h1>Count: {count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
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
    </div>
  );
};

const Selector = () => {
  const visibility = useVisibilitySelector("test");
  // console.log("selector", visibility);
  // useEffect(() => {
  //   if (!visibility) return;
  //   visibility.listeners.onChange(() => {
  //     console.log("SELECTOR", visibility);
  //   });
  // }, []);
  return <>selector</>;
};
const HomeVisibility = () => {
  return (
    <>
      {/* <Selector /> */}
      <Inner />
    </>
  );
};

export default HomeVisibility;
