import { useEffect, useState } from "react";
import {
  useModelSelector,
  useVisibility,
  useVisibilityCommands,
} from "../toggleService";
const VisibilityComponent = () => {
  const visibility = useVisibility({ id: "toggle-1", initState: "on" });
  const visibilityCommands = useVisibilityCommands("toggle-1");

  return (
    <div>
      <div>Visibility Component Visibility: {visibility}</div>
      <button onClick={() => visibilityCommands.onOpen()}>Open</button>
      <button onClick={() => visibilityCommands.onClose()}>Close</button>
      <button onClick={() => visibilityCommands.onToggle()}>Toggle</button>
    </div>
  );
};
const SomeComponent = () => {
  const visibility = useModelSelector("toggle-1");
  console.log("visibility", visibility);
  useEffect(() => {
    const unsubscribe = visibility?.subscribers.onChange((payload: any) => {
      console.log("HOME PAGE PAYLOAD", payload);
    });
    return () => {
      unsubscribe?.();
    };
  }, [visibility]);
  return (
    <div>
      hello
      <button onClick={() => visibility?.commands.onOpen()}>Open</button>
      <button onClick={() => visibility?.commands.onClose()}>Close</button>
      <button onClick={() => visibility?.commands.onToggle()}>Toggle</button>
    </div>
  );
};
const WrapperComponent = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Show</button>
      {show ? <VisibilityComponent /> : "nema"}
    </div>
  );
};
const HomePage = () => {
  return (
    <div>
      <SomeComponent />
      <WrapperComponent />
    </div>
  );
};

export { HomePage };
