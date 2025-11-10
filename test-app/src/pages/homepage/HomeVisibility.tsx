import { createContext, useEffect, useState } from "react";
import { useVisibility, useVisibilityCommands } from "../../visibilityService";

const Inner = () => {
  const [count, setCount] = useState(0);
  const visibility = useVisibility({
    id: "test",
    initState: "off",
  });

  // console.log("HOMEVISIBILITY RENDERED", visibility);

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
          commands.onChange();
        }}
      >
        open
      </button>
      <button
        onClick={() => {
          commands.onChange();
        }}
      >
        close
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
