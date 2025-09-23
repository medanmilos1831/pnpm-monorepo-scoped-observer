import { createContext, type PropsWithChildren } from "react";
import { createWizard } from "../createWizard";
const Context = createContext<ReturnType<typeof createWizard> | undefined>(
  undefined
);
const Provider = ({
  children,
  value,
}: PropsWithChildren<{ value: ReturnType<typeof createWizard> }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Provider, Context };
