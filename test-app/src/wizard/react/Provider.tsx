import { createContext, useState, type PropsWithChildren } from "react";
import { createWizard } from "../createWizard";
const Context = createContext<
  { value: ReturnType<typeof createWizard>; someState: string } | undefined
>(undefined);
const Provider = ({
  children,
  value,
}: PropsWithChildren<{ value: ReturnType<typeof createWizard> }>) => {
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

export { Provider, Context };
