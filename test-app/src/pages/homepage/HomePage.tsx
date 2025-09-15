import React, { useEffect, useState } from "react";
import { VisibilityProvider } from "../../react-visibility-state-new";
import { visibility } from "../../visibilityService";
export const HomePage: React.FC = () => {
  const [counter, setCounter] = useState(0);
  // useEffect(() => {
  //   visibility.open("modalOne");
  // }, []);
  return (
    <>
      <VisibilityProvider.Item name="modalOne">
        {({ state }) => {
          return <div>Hello World {state}</div>;
        }}
      </VisibilityProvider.Item>
      <button onClick={() => visibility.open("modalOne")}>open</button>
    </>
  );
};
