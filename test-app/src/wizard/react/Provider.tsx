import { useState, type PropsWithChildren } from "react";
import { createWizard } from "../createWizard";
import { Context } from "./useStep";

const Provider = ({
  children,
  value,
}: PropsWithChildren<{ value: ReturnType<typeof createWizard> }>) => {
  const [state, setState] = useState(() => {
    return (notify: () => void) => {
      value.pera(notify);
    };
  });
  console.log("state", state);
  return (
    <Context.Provider
      value={{
        value,
        someState: "pera",
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider };
