import { createContext, useEffect, useState } from "react";
import { useVisibility } from "../../visibilityService";

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
  // const commands = useCommands("test");
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
          // commands.on();
        }}
      >
        On
      </button>
      <button
        onClick={() => {
          // commands.off();
        }}
      >
        Off
      </button>
      <button
        onClick={() => {
          // commands.toggle();
        }}
      >
        Toggle
      </button>
    </div>
  );
};

const Selector = () => {
  // const visibility = useVisibilitySelector("test");
  return <>selector</>;
};
const HomeVisibility = () => {
  return (
    <>
      <Inner />
      {/* <Selector /> */}
    </>
  );
};

export default HomeVisibility;
